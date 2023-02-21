const insertNewFileQuery = require("../../db/queries/files/insertNewFileQuery");

const { generateError, saveFile } = require("../../helpers");

const newFile = async (req, res, next) => {
  try {
    const { file } = req.params;

    if (!req.files.file) {
      generateError("Falta el archivo", 400);
    }

    res.send({
      status: "ok",
      message: "Archivo subido exitosamente",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newFile;
