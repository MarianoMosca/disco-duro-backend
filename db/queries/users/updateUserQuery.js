"use strict";

const { generateError } = require("../../../utils/helpers");
const getDB = require("../../getDB");
const selectUserByIdQuery = require("./selectUserByIdQuery");

const updateUserQuery = async (name, email, idUser) => {
  let connection;

  try {
    connection = await getDB();
    if (name) {
      const [users] = await connection.query(
        `
      SELECT id FROM users WHERE name = ?
      `,
        [name]
      );
      if (users.length > 0 && users[0].id !== idUser) {
        generateError("Nombre de usuario no disponible", 403);
      }

      await connection.query(
        `
      UPDATE users SET name = ? WHERE id = ?
      `,
        [name, idUser]
      );
    }

    if (email) {
      const [users] = await connection.query(
        `
      SELECT id FROM users WHERE email = ?
      `,
        [email]
      );
      if (users.length > 0 && users[0].id !== idUser) {
        generateError("El email ya esta ocupado", 403);
      }

      await connection.query(
        `
      UPDATE users SET email = ? WHERE id = ?
      `,
        [email, idUser]
      );
    }
    const updatedUser = await selectUserByIdQuery(idUser);

    return updatedUser;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = updateUserQuery;
