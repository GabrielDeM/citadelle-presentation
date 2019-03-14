const mongoose = require('mongoose');

const buildingsDataSchema = mongoose.Schema({
  upgrade: {},
});

module.exports = mongoose.model('BuildingsData', buildingsDataSchema);
