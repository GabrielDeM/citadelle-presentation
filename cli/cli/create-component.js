const fs = require('fs');
const chalk = require('chalk');
const { replaceAll, upperCaseFirst } = require('./utils');

const baseUrl = require('./baseUrl');
const creationUrl = `${baseUrl}/test`;
const currentPath = process.cwd();

const createComponent = (componentName, componentType) => {
  let urlParts = componentName.split(/[/\\]/);
  componentName = urlParts[urlParts.length - 1];
  componentName = upperCaseFirst(componentName);
  urlParts = urlParts.filter((url, i) => i > 0 && url + '/');
  let partialPath = urlParts.filter((url, i) => i === 0 && url + '/');
  let url = urlParts.map(url => url + '/');
  url = url.join('');

  fs.open(`${currentPath}/${partialPath}/${componentName}/index.js`, 'wx', (err, fd) => {
    if (err) {
      if (err.code === 'EEXIST') {
        console.error(chalk.rgb(250, 30, 25)(`"${componentName}" (component) already exists`));
        return;
      }
      throw err;
    }
    let content = fs.readFileSync(`${baseUrl}/templates/${componentType}-component.js`).toString();
    content = content.replace('component-low', componentName.toLowerCase());
    content = replaceAll(content, 'component', componentName);
    const utilPath = findUtilPath('src');
    content = content.replace('path', utilPath);
    fs.appendFileSync(fd, content, 'utf8')
    console.log(chalk.rgb(17, 250, 67)(`"${componentName}" has been created`))
  })
}

module.exports = createComponent;

const findUtilPath = () => {
  let actualPath = currentPath;
  let resultPath = '';
  const actualPathIndex = actualPath.indexOf('src');
  actualPath = actualPath.substr(actualPathIndex);
  const actualPathArr = actualPath.split(/[/\\]/);
  const i = actualPathArr.length;
  for (let j = 0; j < i; j++) {
    resultPath += '../';
  }
  resultPath += 'global/utils';
  return resultPath;
}
