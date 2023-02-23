"use strict";
const selectFolderByIdQuery = require("../../db/queries/folders/selectFolderByIdQuery");
const deleteFolderQuery = require("../../db/queries/folders/deleteFolderQuery");

const { generateError, deleteImg } = require("../../helpers");

const deleteFolder = async (req, res, next) => {
  try {
    const { idFolder } = req.params;

    // Comprobamos los dueños de la carpeta.
    const folder = await selectFolderByIdQuery(idFolder);

    if (folder.idUser !== req.user.id) {
      generateError("No tienes suficientes permisos", 401);
    }

    // Si la carpeta tiene archivos los eliminamos de la carpeta de "uploads".
    if (folder.image) {
      await deleteImg(folder.image);
    }

    // Eliminamos la carpeta
    await deleteFolderQuery(idFolder);

    res.send({
      status: "ok",
      message: "Carpeta eliminada",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteFolder;
