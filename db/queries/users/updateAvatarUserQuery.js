"use strict";

const getDB = require("../../getDB");
const selectUserByIdQuery = require("./selectUserByIdQuery");

const updateAvatarUserQuery = async (avatar, idUser) => {
  let connection;

  try {
    connection = await getDB();

    await connection.query(
      `
    UPDATE users SET avatar = ? WHERE id = ?
    `,
      [avatar, idUser]
    );
    const updatedUser = await selectUserByIdQuery(idUser);

    return updatedUser;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateAvatarUserQuery;
