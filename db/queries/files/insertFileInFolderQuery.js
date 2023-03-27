"use strict";

const getDB = require("../../getDB");

const insertFileInFolderQuery = async (name, idUser, idFolder) => {
  let connection;

  try {
    connection = await getDB();

    const [file] = await connection.query(
      ` 
      INSERT INTO files (name, idUser, idFolder) VALUES (?, ?, ?) `,
      [name, idUser, idFolder]
    );

    return {
      id: file.insertId,
      name,
      idUser,
      idFolder,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertFileInFolderQuery;
