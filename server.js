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
const { join } = require("path");

app.use("/avatars", express.static(join(__dirname, "uploadsAvatar")));
app.use("/files", express.static(join(__dirname, "uploadsFiles")));

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
  getFilesInFolder,
} = require("./controllers/files");

app.post("/files", isAuth, newFile);

app.post("/folders/:idFolders", isAuth, newFile);

app.get("/folders/:idFolder/files", isAuth, getFilesInFolder);

app.get("/files", isAuth, listFiles);

app.delete("/files/:idFile", isAuth, deleteFile);

// Gestión de descarga de archivos.

const downloadFile = require("./utils/downloadFile");

app.get("/download/:idFile", isAuth, downloadFile);

// Controladores carpetas.

const {
  newFolder,
  deleteFolder,
  listFolders,
} = require("./controllers/folders");
const listFolder = require("./controllers/folders/listFolder");

app.post("/folders", isAuth, newFolder);

app.get("/folders", isAuth, listFolders);

app.get("/folders/:id", isAuth, listFolder);

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
