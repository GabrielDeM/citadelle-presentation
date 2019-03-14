const gameRequests = require('./game');
const globalRequests = require('./global');
const siteRequests = require('./site');

const requests = {
  ...gameRequests,
  ...globalRequests,
  ...siteRequests,
};

module.exports = requests;
