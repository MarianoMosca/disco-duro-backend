"use strict";
const getDB = require("../../getDB");

const insertUserQuery = async (email, password) => {
  let connection;

  try {
    connection = await getDB();

    const [users] = await connection.query(
      `SELECT id FROM users WHERE email = ?`,
      [email]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertUserQuery;
