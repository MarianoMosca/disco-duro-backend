const getDB = require("../../getDB");

const downloadFilesQuery = async (name) => {
  let connection;

  try {
    connection = await getDB();

    const [file] = await connection.query(
      `
    SELECT name FROM files WHERE id = ?
    `,
      [name]
    );
    console.log(file);
    return file[0];
  } finally {
    if (connection) connection.release();
  }
};

module.exports = downloadFilesQuery;
