const selectFolderByIdQuery = require("../../db/queries/folders/selectFolderByIdQuery");
const insertFileQuery = require("../../db/queries/files/insertFileQuery");

const { saveFile, generateError } = require("../../saveFile");

const newFile = async (req, res, next) => {
  console.log(req.files.fichero.name);
  console.log(req.user);
  try {
    const fileName = await saveFile(req.files.fichero.name);
    const idUser = req.user.id;
    //const { idFile } = req.files;
    // Si falta el fichero lanzamos un error.
    if (!req.files?.fichero) {
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
