const getDB = require("../../getDB");

const downloadFilesQuery = async (idUser, idFile) => {
  let connection;

  try {
    connection = await getDB();

    const [file] = await connection.query(
      ` SELECT name FROM files WHERE idUser = ? AND idFile= ?
    `,
      [idUser, idFile]
    );
    console.log(file);
    return file[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = downloadFilesQuery;
