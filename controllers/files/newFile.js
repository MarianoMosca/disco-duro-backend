const insertFileQuery = require("../../db/queries/files/insertFileQuery");
const fs = require("fs/promises");
const { generateError, saveFile } = require("../../helpers");

const newFile = async (req, res, next) => {
  try {
    const fileName = await saveFile(req.files.file.name);
    const idUser = req.user.id;

    // Si falta el fichero lanzamos un error.
    if (!req.files?.file) {
      generateError("Faltan campos", 400);
    }

    // Actualizamos los ficheros del usuario.
    await insertFileQuery(fileName, idUser);

    res.send({
      status: "ok",
      message: "Archivo agregado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newFile;
