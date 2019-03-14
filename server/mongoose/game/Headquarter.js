const mongoose = require('mongoose');
const { Headquarter } = require('../../models/');

exports.createHeadquarter = (citadelId, userId) => {
  const headquarterSave = new Headquarter({
    citadel: mongoose.Types.ObjectId(citadelId),
    citadelId,
    userId,
  });
  return headquarterSave.save();
}

exports.getHeadquarterByCitadel = citadelId => Headquarter.findOne({ citadelId });

exports.levelUp = (id, level) => Headquarter.findByIdAndUpdate(id, { level });

exports.upgrading = (id, timeRemaining) =>
  Headquarter.findByIdAndUpdate(id, { timeRemaining });
