const fs = require('fs');
const chalk = require('chalk');
const { replaceAll, upperCaseFirst } = require('./utils');

const baseUrl = require('./baseUrl');
const creationUrl = `${baseUrl}/test`;
const currentPath = process.cwd();

const createSass = filename => {
  let urlParts = filename.split(/[/\\]/);
  let componentName = urlParts[urlParts.length - 1];
  componentName = upperCaseFirst(componentName);
  let url = urlParts.map(url => {
    if(url !== componentName) url = upperCaseFirst(url);
    return url + '/'
  });
  url = url.join('');

  fs.open(`${currentPath}/${url}${componentName}.scss`, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.error(chalk.rgb(250, 30, 25)(`"${componentName}" (scss) already exists`));
        return;
      }
      throw err;
    }
    let content = fs.readFileSync(`${baseUrl}/templates/sass.scss`).toString();
    content = content.replace('component-low', componentName.toLowerCase());
    content = replaceAll(content, 'component', componentName);
    fs.appendFileSync(fd, content, 'utf8')
  })
}

module.exports = createSass;
