const fs = require('fs');
const chalk = require('chalk');
const { readDir } = require('./readDir');

const removeLog = (dirname, daysAgo) => {
  const date = new Date();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const currentDay = month + day;

  readDir(dirname, files => {
    const filesToRemove = files.filter(filename => {
      const fileDate = filename.split('.json')[0];
      const [ fileDay, fileMonth ] = fileDate.split('-');
      const fileCreationDay = Number(fileDay) + Number(fileMonth);
      return currentDay - fileCreationDay >= daysAgo;
    });
    filesToRemove.forEach(file => {
      fs.unlink(`${dirname}/${file}`, err => {
        if(err) throw err;
        console.log(file + ' has been removed');
      });
    });
  });
}

exports.removeLog = removeLog;
