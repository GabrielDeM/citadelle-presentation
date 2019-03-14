const server = require('./server');
const mongoose = require('./mongoose');
const cache = require('./cache');
const socket = require('./socket');
const color = require('./coloredLogs');
const configs = [
  'server',
  'mongoose',
  'cache',
  'socket',
  'global',
  'color',
];

module.exports = configName => {
  switch (configName) {
    case 'server':
      return server;
    case 'mongoose':
      return mongoose;
    case 'cache':
      return cache;
    case 'socket':
      return socket;
    case 'color':
      return color;
    case 'global':
      return require('global');

    default:
      color.error('config:error: ', `Config name error, config called: "${configName}".`);
      color.info('Available configs:');
      configs.forEach(config => {
        color.info(`   ${config}`);
      });
      process.exit(1);
      break;
  }
}
