const selectUserByEmail = require("../../db/queries/users/selectUserByEmail");
const { generateError } = require("../../helpers");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      generateError("Faltan campos", 400);
    }
    await selectUserByEmail(email);

    /*     const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      generateError("Contraseña incorrecta", 401);
    } */

    /*    const userInfo = {
      id: user.id,
    };

    const token = jwt.sign(userInfo, process.env.SECRET, {
      expiresIn: "6d",
    }); */

    res.send({
      status: "ok",
      message: "Acceso permitido",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = loginUser;
