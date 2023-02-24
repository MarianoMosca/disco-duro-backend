const getDB = require("../../getDB");

const { generateError, deleteArchive } = require("../../../helpers");

const deleteFileQuery = async (idFile, idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [files] = await connection.query(
      `
    SELECT name FROM files WHERE id = ? AND idUser = ?
    `,
      [idFile, idUser]
    );

    if (files.length < 1) {
      generateError("Archivo no encontrado", 404);
    }

    if (files.name) {
      await deleteArchive(files[0].name);
    }

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
