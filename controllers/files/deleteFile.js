const deleteFileQuery = require("../../db/queries/files/deleteFileQuery");
const selectFileByIdQuery = require("../../db/queries/files/selectFileByIdQuery");

const deleteFile = async (req, res, next) => {
  try {
    const { idFile } = req.params;

    await selectFileByIdQuery(idFile);

    await deleteFileQuery(idFile);

    res.send({
      status: "ok",
      message: "archivo eliminado",
    });
  } catch (err) {
    next(err);
  }
};

module.exports = deleteFile;
