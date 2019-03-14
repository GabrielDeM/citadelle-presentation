const chalk = require('chalk');
const log = console.log;

const successC = chalk.rgb(23, 199, 47);
const infoC = chalk.rgb(0, 133, 195);
const warningC = chalk.rgb(251, 174, 30);
const errorC = chalk.bold.rgb(250, 54, 20);
const requestErrorC = chalk.rgb(220, 60, 24);

const success = (...str) => log(successC(...str));
const connectSuccess = (...str) => log(successC.underline(...str));
const info = (...str) => log(infoC(...str));
const warning = (...str) => log(warningC(...str));
const error = (...str) => log(errorC(...str));
const requestError = (...str) => log(requestErrorC(...str));

module.exports = {
  chalk,
  log,

  error,
  info,
  success,
  warning,
  connectSuccess,
  requestError,

  successC,
  warningC,
  infoC,
  errorC,
  requestErrorC,
};
