const auth = require('./auth');
const user = require('./user');

const globalSocket = {
  ...auth,
  ...user,
};

module.exports = globalSocket;
