const getDB = require("../../getDB");

const insertNewFileQuery = async (fileName, idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [file] = await connection.query(
      `
    INSERT INTO files (fileName, idUser) VALUES(?, ?)
    `,
      [fileName, idUser]
    );

    // Retornamos el id que se le ha asignado en la base de datos al nuevo archivo.

    return file.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertNewFileQuery;
