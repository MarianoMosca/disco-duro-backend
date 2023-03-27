"use strict";

const selectFoldersQuery = require("../../db/queries/folders/selectFoldersQuery");

const listFolders = async (req, res, next) => {
  try {
    const folder = await selectFoldersQuery(req.user.id);

    res.send({
      status: "ok",
      data: {
        folder,
      },
    });
  } catch (err) {
    next(err);
  }
};

module.exports = listFolders;
