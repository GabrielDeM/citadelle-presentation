const fs = require('fs');
const chalk = require('chalk');
const { upperCaseFirst } = require('./utils');

const baseUrl = require('./baseUrl');
const creationUrl = `${baseUrl}/test`;
const currentPath = process.cwd();

const createFolder = componentName => {
  let urlParts = componentName.split(/[/\\]/);
  componentName = urlParts[urlParts.length - 1];
  componentName = upperCaseFirst(componentName);
  urlParts = urlParts.filter((url, i) => i > 0 && url + '/');
  let partialPath = urlParts.filter((url, i) => i === 0 && url + '/');
  let url = urlParts.map(url => url + '/');
  url = url.join('');

  fs.mkdir(`${currentPath}/${partialPath}/${componentName}`, err => {
    if(err) {
      if(err.code === 'EEXIST') {
        console.error(chalk.rgb(250, 30, 25)(`"{componentName}" (folder) already exists`));
        return;
      }
      throw err;
    }
  })
}

module.exports = createFolder;
