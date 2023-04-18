"use strict";

const getDB = require("../../getDB");

const listFilesInFolder = async (idFolder, idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [files] = await connection.query(
      ` 
      SELECT originalName FROM files where idFolder = ? AND idUser = ?`,
      [idFolder, idUser]
    );

    return {
      files: files,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listFilesInFolder;
