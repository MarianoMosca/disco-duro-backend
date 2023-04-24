"use strict";

const selectFolderQuery = require("../../db/queries/folders/selectFolderQuery");

const listFolder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const folder = await selectFolderQuery(req.user.id, id);

    res.send({
      status: "ok",
      data: folder,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listFolder;
