const { generateError, saveFile } = require("../../helpers");
const insertFolderQuery = require("../../db/queries/folders/insertFolderQuery");

const newFolder = async (req, res, next) => {
  try {
    const { name } = req.body;

    if (!name) {
      generateError("Faltan campos", 400);
    }

    const folderId = insertFolderQuery(name, req.user.id);

    let files = [];

    if (req.files) {
      for (const file of Object.values(req.files).slice(0, 3)) {
        const fileName = await saveFile(file.name);
        files.push(fileName);
      }
    }

    res.send({
      status: "Ok",
      message: "Carpeta creada",
      folderId,
      files,
    });
  } catch (err) {
    next(err);
  }
};

module.exports = newFolder;
