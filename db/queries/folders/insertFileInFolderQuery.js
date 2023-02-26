/* const getDB = require("../../getDB");

const insertFileInFolderQuery = async (folderName, fileName, idUser) => {
  let connection;
  try {
    connection = await getDB();

    const [newFileInFolder] = await connection.query(
      `
    INSERT INTO folders (name,fileName, idUser) VALUES (?, ?, ?)
    `,
      [folderName, fileName, idUser]
    );

    return newFileInFolder.insertId;
  } finally {
    if (connection) connection.release();
  }
};

module.exports = insertFileInFolderQuery;
 */
