"use strict";
const insertUserQuery = require("../../db/queries/users/insertUserQuery");

const newUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      const err = new Error("Faltan campos");
      err.httpStatus = 400;
      throw err;
    }

    await insertUserQuery(email, password);

    res.send({
      status: "ok",
      message: "Usuario creado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newUser;
