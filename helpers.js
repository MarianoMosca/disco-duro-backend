"use strict";
const fs = require("fs/promises");
const path = require("path");
const sharp = require("sharp");
const { v4: uuid } = require("uuid");

const generateError = (msg, status) => {
  const err = new Error(msg);
  err.httpStatus = status;
  throw err;
};

const saveImg = async (img) => {
  const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);

  try {
    await fs.access(uploadsPath);
  } catch {
    await fs.mkdir(uploadsPath);
  }

  const sharpImg = sharp(img.data);

  sharpImg.resize(100);

  const imgName = `${uuid()}.jpg`;

  const imgPath = path.join(uploadsPath, imgName);

  await sharpImg.toFile(imgPath);

  return imgName;
};

const deleteImg = async (imgName) => {
  try {
    // Creamos la ruta absoluta a la imagen que queremos eliminar.
    const imgPath = path.join(__dirname, process.env.UPLOADS_DIR, imgName);

    try {
      // Intentamos acceder a la imagen utilizando el método "access" de fs. Este
      // método genera un error si no es posible acceder al archivo.
      await fs.access(imgPath);
    } catch (error) {
      // Si "access" genera un error entramos en el "catch". Finalizamos la función
      // dado que la imagen no existe, no tiene sentido borrarla.
      return;
    }

    // Si llegamos hasta aquí quiere decir que la imagen existe. La eliminamos.
    await fs.unlink(imgPath);
  } catch {
    generateError("Error al eliminar la imagen del servidor");
  }
};

const saveFile = async (file) => {
  // Creamos la ruta absoluta al directorio donde vamos a subir los ficheros.
  const uploadsPath = path.join(__dirname, process.env.UPLOADS_DIR);

  try {
    // Intentamos acceder al directorio de subida de archivos mediante el método
    // "access". Este método genera un error si no es posible acceder al archivo
    // o directorio.
    await fs.access(uploadsPath);
  } catch {
    // Si "access" lanza un error entramos en el catch y creamos el directorio.
    await fs.mkdir(uploadsPath);
  }

  // Generamos un nombre único para el fichero
  const fileName = `${uuid()}`;

  // Generamos la ruta absoluta a la imagen que queremos guardar.
  const imgPath = path.join(uploadsPath, fileName);

  // Guardamos el fichero en el directorio de subida de archivos.

  await fs.writeFile(imgPath, file);
  // Retornamos el nombre del fichero.  Ya la tenemos en disco.
  return fileName;
};

module.exports = {
  generateError,
  saveImg,
  deleteImg,
  saveFile,
};
