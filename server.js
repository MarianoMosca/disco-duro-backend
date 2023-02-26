"use strict";

require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const fileUpload = require("express-fileupload");
const app = express();

app.use(cors());

app.use(express.json());

app.use(fileUpload());

app.use(morgan("dev"));

// Middleware personalizados.

const isAuth = require("./middlewares/isAuth");

// Controladores usuarios.

const {
  newUser,
  loginUser,
  getOwnUser,
  editUser,
  editUserAvatar,
} = require("./controllers/users");

app.post("/users", newUser);

app.post("/users/login", loginUser);

app.get("/users", isAuth, getOwnUser);

app.put("/users", isAuth, editUser);

app.put("/users/avatar", isAuth, editUserAvatar);

// Controladores archivos.

const {
  newFile,
  deleteFile,
  listFiles,
  downloadFile,
} = require("./controllers/files");

app.post("/files", isAuth, newFile);
app.get("/files/", isAuth, listFiles);
app.delete("/users/:idUser/files/:idFile", isAuth, deleteFile);
app.get("/files/download", isAuth, downloadFile);

// Controladores carpetas.

const { newFolder, deleteFolder } = require("./controllers/folders");

app.post("/folders", isAuth, newFolder);
/* app.get("/folders", listFolders); */
app.delete("/users/:idUser/folders/:idFolder", isAuth, deleteFolder);

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
