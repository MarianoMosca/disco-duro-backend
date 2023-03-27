"use strict";

const getDB = require("../../getDB");

const selectFoldersQuery = async (idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [folders] = await connection.query(
      `
    SELECT F.*, U.name AS user
    FROM folders F
    INNER JOIN users U ON U.id = F.idUser
    WHERE idUser = ?
    `,
      [idUser]
    );

    return folders;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectFoldersQuery;
