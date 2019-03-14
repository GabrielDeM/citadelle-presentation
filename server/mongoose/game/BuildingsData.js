const { BuildingsData } = require('../../models/');

exports.getBuildingsData = () => BuildingsData.find();

exports.getBuildingData = name => BuildingsData.findOne({ name });

exports.addBuildingsData = buildingsData => {
  const buildingsDataSave = new BuildingsData({
    upgrade: buildingsData,
  });
  return buildingsDataSave.save();
}
