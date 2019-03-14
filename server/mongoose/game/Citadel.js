const mongoose = require('mongoose');
const { Citadel } = require('../../models/');
const { ObjectId } = mongoose.Types;

exports.createCitadel = (name, userId) => {
  const citadelSave = new Citadel({
    name,
    user: mongoose.Types.ObjectId(userId),
    userId,
  });
  return citadelSave.save();
}

exports.getCitadelByUser = userId => Citadel.findOne({ userId });

exports.getAllCitadels = () => Citadel.find().sort({ name: 1 });

exports.updateRessources = citadel => Citadel.findByIdAndUpdate(citadel._id, {resources: citadel.resources});

exports.getCitadelById = id => Citadel.findById(id);

exports.getAllCitadelsByUser = userId => Citadel.find({ userId });
