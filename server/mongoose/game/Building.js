const mongoose = require('mongoose');
const { Building } = require('../../models/');


exports.createBuilding = (name, headquarterId, citadelId, userId) => {
  const buildingSave = new Building({
    name,
    headquarter: mongoose.Types.ObjectId(headquarterId),
    headquarterId,
    citadelId,
    userId,
  });
  return buildingSave.save();
}

exports.getBuildingsByHeadquarter = (id, model) => Building.find({ [`${model}Id`]: id });

exports.levelUp = (id, level) => Building.findByIdAndUpdate(id, { level });

exports.upgrading = (id, timeRemaining) =>
  Building.findByIdAndUpdate(id, { timeRemaining });

exports.getAllBuildings = () => Building.find();

exports.getRessourcesBuildingsByUser = userId => Building.find({
  name: { $in: ['oilPlateform', 'ironMine', 'ammoFactory', 'hydroponicFarm', 'warehouse'] },
  userId,
});
exports.setEndUpgradeTime = ( id, endUpgradeTime ) => Building.findByIdAndUpdate(id, { endUpgradeTime });

exports.downgrade = () => {
  getBuildings().then(buildings => {
    buildings.forEach(building => {
      downgrade(building._id).then().catch();
    });
  }).catch();
}

const getBuildings = () => Building.find();
const downgrade = (id) => Building.findByIdAndUpdate(id, {level:1});
