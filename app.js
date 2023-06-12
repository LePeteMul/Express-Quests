require("dotenv").config();
const port = process.env.APP_PORT ?? 5000;
const express = require("express");
const app = express();
app.use(express.json());

const { hashPassword } = require("./auth.js");

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

app.get("/", welcome);

const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");

app.get("/api/movies/", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);

app.get("/api/users/", userHandlers.getUsers);
app.get("/api/users/:id", userHandlers.getUserById);

app.post("/api/movies", movieHandlers.postMovie);
app.post("/api/users", hashPassword, userHandlers.postUser);

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
