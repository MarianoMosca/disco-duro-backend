require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

app.use(cors());

app.use(express.json());

app.use(morgan("dev"));

//middleware
const isAuth = require("./middelwares/isAuth");

const newUser = require("./controllers/users/newUser");
const loginUser = require("./controllers/users/loginUser");
const getOwnUser = require("./controllers/users/getOwnUser");

app.post("/users", newUser);
app.post("/users/login", loginUser);
app.get("/users", isAuth, getOwnUser);

// Middleware gestion de errores.
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.httpStatus || 500).send({
    status: "error",
    message: err.message,
  });
});

// Middleware 404.
app.use((req, res) => {
  res.status(404).send({
    status: "error",
    message: "Ruta no encontrada ",
  });
});

// Lanzamos el server.

app.listen(process.env.PORT, () => {
  console.log(`Server listening http://localhost:${process.env.PORT}`);
});
