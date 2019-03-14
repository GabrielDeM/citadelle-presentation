const fs = require('fs');
const chalk = require('chalk');

let createFolder = folderType => {
  //! will be used later
  const date = new Date; // récupère la date de type Date
  const year = date.getFullYear(); // récupère l'année entière
  const month = date.getMonth() + 1; // récupère le mois (return une valeur entre 0 et 11 donc +1)
  const day = date.getDate(); // récupère le jour
  //! will be used later
  const file = `${__dirname}/../logs/${folderType}`;

  fs.exists(file, exists => {
    if(!exists) {
      fs.mkdir(file, err => {
        if (err) throw err;
        else {
          console.log(chalk.rgb(14, 240, 65)(`The folder "${__dirname}/../logs/${folderType}" has been successfully created.`));
        }
      })
    }
  })
}

exports.createFolder = createFolder;
