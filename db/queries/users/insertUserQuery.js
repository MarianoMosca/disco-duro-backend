"use strict";
const getDB = require("../../getDB");

const bcrypt = require("bcrypt");

const { generateError } = require("../../../helpers");

const insertUserQuery = async (name, email, password) => {
  let connection;

  try {
    connection = await getDB();
    // Intentamos obtener a un usuario con el nombre de usuario dado y si existe se lanza error
    let [users] = await connection.query(
      `SELECT id FROM users WHERE name = ?`,
      [name]
    );

    if (users.length > 0) {
      generateError("Nombre de usuario no disponible", 403);
    }

    //comprobamos si existe el usuario con el email dado y si existe lanzamos un error
    [users] = await connection.query(`SELECT id FROM users WHERE email = ?`, [
      email,
    ]);

    if (users.length > 0) {
      generateError("Ya existe un usuario con el mismo email", 403);
    }
    //Encriptamos la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    //Insertamos el usuario en la base datos.
    await connection.query(
      `INSERT INTO users (name, email, password) VALUE(?, ?, ?)`,
      [name, email, hashedPassword]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
