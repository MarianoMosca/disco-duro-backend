"use strict";
const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");

const insertFileQuery = async (name, idFolder) => {
  let connection;

  try {
    connection = await getDB();

    const [files] = await connection.query(
      `SELECT id FROM files where idFolder = ?`,
      [idFolder]
    );
    if (files.length > 2) {
      generateError("No es posible agregar más de tres ficheros", 403);
    }

    const [newFile] = await connection.query(
      `INSERT INTO files (name, idFolder) VALUES (?,?)`,
      [name, idFolder]
    );
    return newFile.insertId; //para saber el id que el fichero tiene en la base de datos
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertFileQuery;
