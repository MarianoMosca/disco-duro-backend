"use strict";

const insertFileQuery = require("../../db/queries/files/insertFileQuery");
const selectFileByIdQuery = require("../../db/queries/files/selectFileByIdQuery");

const { generateError, saveFile } = require("../../utils/helpers");

const newFile = async (req, res, next) => {
  try {
    const idUser = req.user.id;

    const originalName = req.body.originalName;

    const idFolder = req.body.idFolder;

    if (!req.files?.file || !originalName) {
      generateError("Faltan campos", 400);
    }
    const fileName = await saveFile(req.files.file);

    const { id } = await insertFileQuery(
      fileName,
      originalName,
      idFolder,
      idUser
    );
    const fileInfo = await selectFileByIdQuery(id);

    res.send({
      status: "ok",
      data: fileInfo,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newFile;
