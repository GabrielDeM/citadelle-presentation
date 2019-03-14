const fs = require('fs');
const chalk = require('chalk');
const formatters = require('./formatLog');
const { upperCaseFirst } = require('../utils/misc');


const readAndWrite = (fileType, data) => {
  const date = new Date(); // récupère la date de type Date
  const year = date.getFullYear(); // récupère l'année entière
  const month = date.getMonth() + 1; // récupère le mois (return une valeur entre 0 et 11 donc +1)
  const day = date.getDate(); // récupère le jour
  const hour = date.getHours();
  const min = date.getMinutes();
  const sec = date.getSeconds();
  const formattedDate = `${day}-${month}-${year}`;
  const formattedTime = `${hour}:${min}:${sec}`;

  const file = `${__dirname}/../logs/${fileType}/${formattedDate}.json`;
  fs.exists(file, exists => {
    if(exists) {
      fs.readFile(file, 'utf-8', (err, fileData) => {
        if (err) throw err;
        data.date = formattedDate;
        data.time = formattedTime;

        const formatter = formatters[`format${upperCaseFirst(fileType)}`];
        let json = formatter(data, fileData);
        /*let newData = `[${formattedTime}]: {
          |${data}
          ||}\n\n`;
        newData = newData.replace(/\u0020+\|\|/g, '');
        newData = newData.replace(/\|/g, '|  ');
        newData = newData.replace(/\u0020+\|/g, '');
        let newFileData = `${newData}${fileData}`;*/

        fs.writeFile(file, json, 'utf-8', err => {
          if (err) throw err;
        });

      });
    }
  })
  return {
    file,
    formattedDate,
    formattedTime,
  };
}

exports.readAndWrite = readAndWrite;
