const path = require('path');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const port = process.env.PORT || 9000;
const build = express.static(path.join(__dirname, '/../../build'));
const { connectSuccess } = require('./coloredLogs');

app.listen(port, connectSuccess('Express:success: ', `Express server listening on port ${port + 2}`));

module.exports = {
  http,
  express,
  app,
  port,
  build,
};
