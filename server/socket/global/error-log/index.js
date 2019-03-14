const authErrorLogs = require('./auth');
const userErrorLogs = require('./auth');

module.exports = {
  ...authErrorLogs,
  ...userErrorLogs,
};
