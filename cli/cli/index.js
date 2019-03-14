const program = require('commander');
const inquirer = require('inquirer');
const argv = require('yargs').argv;
const publish = require('./publish');
const createComponent = require('./create-component');
const createFolder = require('./create-folder');
const createSass = require('./create-sass');
//const publish = str => console.log(str);

let promptTemplate = {
  type: 'input',
  name: 'command'
};

let question = [promptTemplate];

const createPrompt = () => {
  inquirer
  .prompt(question)
  .then(answer => {
    const message = answer.command.split('"')[1];
    const component = answer.command.split(' ')[1];
    const aCommand = answer.command;
    const g = aCommand.charAt(0) === 'g';
    const c = aCommand.charAt(0) === 'c';
    const sl = aCommand.charAt(0) === 's' && aCommand.charAt(1) === 'l';
    const sf = aCommand.charAt(0) === 's' && aCommand.charAt(1) === 'f';
    const rsl = aCommand.charAt(0) === 'r' && aCommand.charAt(1) === 's' && aCommand.charAt(2) === 'l';
    const rsf = aCommand.charAt(0) === 'r' && aCommand.charAt(1) === 's' && aCommand.charAt(2) === 'f';
    const command = {
      g: g && message,
      c: c && component,
      sl: sl && component,
      sf: sf && component,
      rsl: rsl && component,
      rsf: rsf && component,
    }
    actions(command)
      .then(createPrompt)
      .catch();
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  })
}
createPrompt();

program
  .version('0.1.0')
  .command('z')
  .option('-g, --git', 'publish the local to repo on github')
  .option('-c, --component', 'create a stateless component')
  .option('--sl, --stateless', 'create a stateless component')
  .option('--sf, --statefull', 'create a statefull component')
  .option('--rsl, --redux-stateless', 'create a redux stateless component')
  .option('--rsf, --redux-statefull', 'create a redux statefull component')
.parse(process.argv);

const actions = (argv) => {
  const git = argv.g || argv.git;
  if(git) {
    publish(git);
  }

  const { c, sl, sf, rsl, rsf } = argv;
  const componentOption = c || sl || sf || rsl || rsf;
  if(componentOption) {
    createFolder(componentOption);
    createSass(componentOption);
  }
  if(c || sl) createComponent(c || sl, 'sl');
  if(sf) createComponent(sf, 'sf');
  if(rsl) createComponent(rsl, 'rsl');
  if(rsf) createComponent(rsf, 'rsf');
  return new Promise(resolve => {
    setTimeout(() => {
      resolve();
    }, 100);
  })
}
actions(argv);
