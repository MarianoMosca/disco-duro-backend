"use strict";

// POSIBLEMENTE BORREMOS ESTE CONTROLADOR Y UTILICEMOS SOLO NEWFILE.JS

const insertFileInFolderQuery = require("../../db/queries/files/insertFileInFolderQuery");

const { generateError, saveFile } = require("../../utils/helpers");

const newFileInFolder = async (req, res, next) => {
  try {
    const fileName = await saveFile(req.files.file);
    const idUser = req.user.id;

    if (!req.files?.file) {
      generateError("Faltan campos", 400);
    }

    await insertFileInFolderQuery(fileName, idUser);

    res.send({
      status: "ok",
      message: "Archivo agregado a la carpeta con exito",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newFileInFolder;
