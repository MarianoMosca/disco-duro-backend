"use strict";

const getDB = require("../../getDB");

const listFilesInFolder = async (idFolder, idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [files] = await connection.query(
      `SELECT F.id, F.originalName AS name, F.name AS originalName, F.idUser, F.idFolder, F.createdAt, F.modifiedAt, U.name AS user
FROM files F
INNER JOIN users U ON U.id = F.idUser 
WHERE F.idFolder = ? AND F.idUser = ?`,
      [idFolder, idUser]
    );
    console.log("aaaaaa: ", files);
    return files;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = listFilesInFolder;
