const mongoose = require('mongoose');
const { Unit } = require('../../models/');

exports.recruitUnit = (name, headquarterId) => {
  const unitSave = new Unit({
    name,
    headquarter: mongoose.Types.ObjectId(headquarterId),
  });
  return unitSave.save();
}
