const { app, build } = require('../config')('server');
const routes = require('./global');

app.use('/', build);
app.use('*', build);
