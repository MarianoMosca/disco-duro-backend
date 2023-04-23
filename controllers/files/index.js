"use strict";

const newFile = require("./newFile");
const deleteFile = require("./deleteFile");
const listFiles = require("./listFiles");
const downloadFile = require("../../utils/downloadFile");

const getFilesInFolder = require("./getFilesInFolder");
module.exports = {
  newFile,
  deleteFile,
  listFiles,
  downloadFile,
  getFilesInFolder,
};
