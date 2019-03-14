const mongoose = require('mongoose');
const deepPopulate = require('mongoose-deep-populate')(mongoose);
// on défini deepPopulate en lui donnant mongoose en paramètre

const buildingSchema = mongoose.Schema({
  name: { type: String, required: true },
  level: { type: Number, default: 1 },
  timeRemaining: Number,
  endUpgradeTime: Number,
  headquarter: { type: mongoose.Schema.Types.ObjectId, ref: 'Headquarter' },
  headquarterId: { type: String, required: true },
  userId: { type: String, required: true },
  citadelId: { type: String, required: true },
});

// on dit a mongoose que dans ce schema on veut y ajouter un plugin externe, en donnant ce plugin enj paramètre
buildingSchema.plugin(deepPopulate);

module.exports = mongoose.model('Building', buildingSchema);
