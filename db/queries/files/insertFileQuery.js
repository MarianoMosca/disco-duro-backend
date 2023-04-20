"use strict";

const getDB = require("../../getDB");

const insertFileQuery = async (name, originalName, idFolder, idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [file] = await connection.query(
      ` 
      INSERT INTO files (name, originalName, idFolder, idUser) VALUES (?, ?, ?, ?) `,
      [name, originalName, idFolder, idUser]
    );

    return {
      id: file.insertId,
      idFolder,
      name,
      originalName,
      idUser,
    };
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertFileQuery;
