const { createFolder } = require('./createFolder');
const { readAndWrite } = require('./readAndWrite');
const { createFile } = require('./createFile');
const { removeLog } = require('./removeLogs');

const logDirStr = 'warning:7 error:7 suspicion:10';
const logDirArr = logDirStr.split(' ');
const logsPath = `${__dirname}/../logs`;

setTimeout(() => {
  logDirArr.forEach(logDir => {
    const [logType, day] = logDir.split(':');
    createFile(logType);
    removeLog(`${logsPath}/${logType}`, Number(day));
  });
}, 1000 * 3600 * 12);


exports.createFolder = createFolder;
exports.readAndWrite = readAndWrite;
exports.createFile = createFile;
