const { createFolder, createFile, readAndWrite } = require('../logger');
const { requestError } = require('../config')('color');

const log = (logType, data) => {
  createFolder(logType);
  createFile(logType);
  return readAndWrite(logType, data);
}

const errorLogger = error => {
  const fileInfo = log('error', error);
  requestError(error, `\n`);
}

exports.log = log;
exports.errorLogger = errorLogger;
