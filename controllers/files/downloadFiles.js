const downloadFilesQuery = require("../../db/queries/files/downloadFilesQuery");
const { generateError, saveFile } = require("../../helpers");

const downloadFile = async (req, res, next) => {
  try {
    const fileName = await saveFile(req.files.name);
    const file = downloadFilesQuery(fileName);

    res.download(fileName, "index.pdf", (err) => {
      if (err) {
        generateError("No se pudo descargar el archivo");
      }
    });
  } catch (err) {
    next(err);
  }
};

module.exports = downloadFile;
