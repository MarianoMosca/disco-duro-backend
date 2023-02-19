"use strict";

const selectUserByIdQuery = require("../../db/queries/selectUserByIdQuery");

const getOwnUser = async (req, res, next) => {
  try {
    const user = await selectUserByIdQuery(req.user.id);

    res.send({
      status: "ok",
      user,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = getOwnUser;
