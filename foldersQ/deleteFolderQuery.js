"use strict";

const getDB = require("../../getDB");

const deleteFolderQuery = async (idFolder) => {
  let connection;

  try {
    connection = await getDB();

    //Eliminamos la carpeta
    await connection.query(`DELETE FROM folders WHERE id = ?`, [idFolder]);
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteFolderQuery;
