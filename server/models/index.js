const gameModels = require('./game');
const globalModels = require('./global');
const siteModels = require('./site');

const models = {
  ...gameModels,
  ...globalModels,
  ...siteModels,
};

module.exports = models;
