const mongoose = require('mongoose');

const headquarterSchema = mongoose.Schema({
  level: { type: Number, default: 1 },
  citadel: { type: mongoose.Schema.Types.ObjectId, ref: 'Citadel' },
  citadelId: { type: String, required: true },
  userId: { type: String, required: true },
  endUpgradeTime: Number,
});

module.exports = mongoose.model('Headquarter', headquarterSchema);
