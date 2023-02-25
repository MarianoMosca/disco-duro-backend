"use strict";
const selectFoldersQuery = require("../../db/queries/folders/selectFoldersQuery");

const listFolders = async (req, res, next) => {
  try {
    const { getFolders } = req.params;
    const folders = await selectFoldersQuery(getFolders);

    res.send({
      status: "ok",
      data: {
        folders,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listFolders;
