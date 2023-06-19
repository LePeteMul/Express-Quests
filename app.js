require("dotenv").config();
const port = process.env.APP_PORT ?? 5000;
const express = require("express");
const app = express();
app.use(express.json());

const { hashPassword, verifyPassword, verifyToken } = require("./auth");

const userHandlers = require("./userHandlers");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};


//utilisateur test : Bob,Gru, bob@mail.com, ville "Lo" langage "Kt" mot de passe:truc

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
// const userHandlers = require("./userHandlers");


//routes publiques
app.get("/api/movies/", verifyToken, movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.get("/api/users/", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);
app.post(
  "/api/login",
  userHandlers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
app.post("/api/users", hashPassword, userHandlers.postUser);

app.use(verifyToken);//mur d'authetification
//routes protégées
app.post("/api/movies", movieHandlers.postMovie);
app.put("/api/movies/:id", movieHandlers.updateMovie);
app.put("/api/users/:id", hashPassword, userHandlers.updateUser);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
