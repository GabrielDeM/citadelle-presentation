const buildingsDataSorting = (buildingsData, buildings) => {
  let newBuildingsData = {};
  buildings.forEach(building => {
    const { name, level } = building;
    newBuildingsData[name] = {};
    const buildingLevel = buildingsData[name][level];
    if (buildingLevel.production)
      newBuildingsData[name].production = buildingLevel.production;
    else if(buildingLevel.storage)
      newBuildingsData[name].storage = buildingLevel.storage;
    newBuildingsData[name].level = level;
  });
  return newBuildingsData;
}

exports.buildingsDataSorting = buildingsDataSorting;
