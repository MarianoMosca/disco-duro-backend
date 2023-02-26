const fs = require("fs/promises");
const path = require("path");
const selectFilesQuery = require("../../db/queries/files/selectFilesQuery");
const { readFile, saveFile, generateError } = require("../../helpers");

const downloadFile = async (req, res, next) => {
  try {
    /* const fileName = await saveFile(req.query.name); */
    /* let file = await readFile(fileName);
     */

    /*  const [file] = await selectFilesQuery(req.user.id); */
    const filePath = "./uploads/4e273cda-1a78-4ed7-835b-2ecb1e8f7c32.pdf";
    console.log(filePath);

    try {
      // Intentamos acceder al archivo utilizando el método "access" de fs. Este
      // método genera un error si no es posible acceder al archivo.
      await fs.access(filePath);
    } catch (error) {
      // Si "access" genera un error entramos en el "catch". Finalizamos la función
      // dado que el fichero no existe, no tiene sentido .
      return;
    }

    // Si llegamos hasta aquí quiere decir que el fichero existe. Lo descargamos.
    //res.download(filePath, file);
    res.download(filePath, "index.pdf");
    res.send({
      status: "ok",
      filePath,
      message: "Archivo descargado",
    });
  } catch {
    generateError("Error al descargar el fichero del servidor");
  }
};
module.exports = downloadFile;
