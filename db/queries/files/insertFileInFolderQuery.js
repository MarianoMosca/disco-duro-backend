"use strict";

const getDB = require("../../getDB");

const insertFileInFolderQuery = async (
  name,
  originalName,
  idUser,
  idFolder
) => {
  let connection;

  try {
    connection = await getDB();

    const [file] = await connection.query(
      ` 
      INSERT INTO files (name, originalName, idUser, idFolder) VALUES (?, ?, ?, ?) `,
      [name, originalName, idUser, idFolder]
    );

    return {
      id: file.insertId,
      name,
      originalName,
      idUser,
      idFolder,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertFileInFolderQuery;
