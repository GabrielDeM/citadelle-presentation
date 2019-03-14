const chalk = require('chalk');

const formatError = (logObject, fileData) => {
  if(typeof logObject !== 'object') return fileData;
  const { date, time, error } = logObject;
  const {
    severity,
    library,
    section,
    errorMessage,
    fullErrorMessage,
    info,
    stack,
  } = error;
  if(
    !date ||
    !time ||
    !severity ||
    !library ||
    !section ||
    !stack ||
    !errorMessage
  ) {
    console.log(chalk.red('Logger:error: an important information is missing in a log.'))
    console.log(chalk.blue(`
The required informations are:
  - date
  - time
  - severity
  - library
  - section
  - stack
  - errorMessage
    `));
    return fileData;
  }

  const formattedLogObject = {
    date,
    time,
    error: {
      severity,
      library,
      section,
      errorMessage,
      fullErrorMessage,
      stack: stack.stack,
      code: stack.code,
      info,
    },
  };

  fileData = JSON.parse(fileData);
  fileData.data.unshift(formattedLogObject);
  fileData = JSON.stringify(fileData);
  return fileData;
}

exports.formatError = formatError;
