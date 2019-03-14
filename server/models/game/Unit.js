const mongoose = require('mongoose');

const unitSchema = mongoose.Schema({
  name: { type: String, required: true },
  headquarter: { type: mongoose.Schema.Types.ObjectId, ref: 'Headquarter' },
});

module.exports = mongoose.model('Unit', unitSchema);
