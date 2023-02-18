const generateError = (msg, status) => {
  const err = new Error(msg);
  err.httpStatus = status;
  throw err;
};

module.exports = {
  generateError,
};
