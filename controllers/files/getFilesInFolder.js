"use strict";

const listFilesInFolder = require("../../db/queries/files/listfilesInFolder");

const getFilesInFolder = async (req, res, next) => {
  try {
    const idUser = req.user.id;

    const idFolder = req.params.idFolder;
    const files = await listFilesInFolder(idFolder, idUser);
    console.log("FILES:", files);
    res.send({
      status: "ok",
      data: files,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getFilesInFolder;
