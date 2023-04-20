"use strict";

const getDB = require("../../getDB");

const selectFolderQuery = async (idUser, idFolder) => {
  let connection;

  try {
    connection = await getDB();

    const [folders] = await connection.query(
      `
    SELECT F.*, U.name AS user
    FROM folders F
    INNER JOIN users U ON U.id = F.idUser
    WHERE F.idUser = ? AND F.id = ?
    `,
      [idUser, idFolder]
    );

    return folders[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectFolderQuery;
