const { generateError } = require("../../../helpers");
const getDB = require("../../getDB");

const selectFilesQuery = async (idUser) => {
  let connection;

  try {
    connection = await getDB();

    const [files] = await connection.query(
      `
    SELECT * FROM files WHERE idUser = ?
    `,
      [idUser]
    );

    return files;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = selectFilesQuery;
