"use strict";

const { generateError } = require("../../utils/helpers");
const updateUserQuery = require("../../db/queries/users/updateUserQuery");

const editUser = async (req, res, next) => {
  try {
    const { name, email } = req.body;

    if (!name && !email) {
      generateError("Faltan campos", 400);
    }

    const user = await updateUserQuery(name, email, req.user.id);

    res.send({
      status: "ok",
      message: "Usuario actualizado",
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = editUser;
