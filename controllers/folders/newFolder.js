"use strict";

const { generateError, saveFile } = require("../../utils/helpers");
const insertFolderQuery = require("../../db/queries/folders/insertFolderQuery");
const insertFileQuery = require("../../db/queries/files/insertFileQuery");

const newFolder = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      generateError("Faltan campos", 400);
    }

    const idFolder = await insertFolderQuery(name, req.user.id);

    let files = [];

    if (req.files) {
      for (const file of Object.values(req.files).slice(0, 3)) {
        const fileName = await saveFile(file);

        files.push(fileName);
        await insertFileQuery(file.name, fileName, idFolder, req.user.id);
      }
    }
    const data = {
      id: idFolder,
      name,
      idUser: req.user.id,
      createdAt: new Date(),
      files,
    };
    res.send({
      status: "Ok",
      data,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newFolder;
