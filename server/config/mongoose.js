const mongoose = require('mongoose');
const api = require('./api');
const { error, connectSuccess } = require('./coloredLogs');
mongoose.Promise = Promise;

mongoose.connect(api.mongoURI, { useNewUrlParser: true })
  .then(() => connectSuccess('Mongoose:success: ', 'MongoDB starting'))
  .catch(err => {
    error('mongoose:error: ', `MongoDB error ${err}`);
    process.exit(1);
  });

mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
