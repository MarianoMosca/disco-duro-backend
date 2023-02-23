const getDB = require("../../getDB");
const deleteArchive = require("../../../helpers");
const generateError = require("../../../helpers");
const deleteFileQuery = async (idFile) => {
  let connection;

  try {
    connection = await getDB();

    const [file] = await connection.query(
      `
    SELECT name FROM files WHERE id = ? 
    `[idFile]
    );

    if (file.length < 1) {
      generateError("Archivo no encontrado", 404);
    }

    await deleteArchive(file[0].name);

    await connection.query(
      `
    DELETE FROM files WHERE id = ? 
    `,
      [idFile]
    );
  } finally {
    if (connection) connection.release();
  }
};

module.exports = deleteFileQuery;
