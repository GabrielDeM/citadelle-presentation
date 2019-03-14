const fs = require('fs');

const readDir = (dirname, callback) => {
  fs.readdir(dirname, (err, filenames) => {
    if(err) throw err;
    callback(filenames);
  })
}

exports.readDir = readDir;
