const fs = require('fs');
const chalk = require('chalk');

const baseDataFile = `{
  "data": []
}`;

const createFile = fileType => {
  const date = new Date; // récupère la date de type Date
  const year = date.getFullYear(); // récupère l'année entière
  const month = date.getMonth() + 1; // récupère le mois (return une valeur entre 0 et 11 donc +1)
  const day = date.getDate(); // récupère le jour
  const formattedDate = `${day}-${month}-${year}`;
  const file = `${__dirname}/../logs/${fileType}/${formattedDate}.json`;

  fs.exists(file, exists => {
    if(!exists) {
      fs.open(file, 'wx', (err, fd) => {
        if (err) {
          if (err.code === 'EEXIST') {
            //console.error(chalk.rgb(250, 30, 25)(`The file "${file}" already exist.`));
            return;
          }
          throw err;
        } else {
          console.log(chalk.rgb(14, 240, 65)(`The file "${file}" has been successfully created.`));
          fs.writeFile(file, baseDataFile, 'utf-8', err => {
            if (err) throw err;
          });
        }
      });
    }
  })
}

exports.createFile = createFile;
