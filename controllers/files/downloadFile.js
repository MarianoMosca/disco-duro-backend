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

/* var download = function (uri, filename, callback) {
console.log("content-type:", res.headers["content-type"]);
console.log("content-length", res.headers["content-length"]);

request(uri).pipe(fs.createWriteStream(filename)).on("close", callback)
});
};
module.exports = {
  download
} */
