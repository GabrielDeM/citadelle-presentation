import socket from './config';

export const on = {
  getCitadelFromDB: callback => socket.on('getCitadelFromDB', citadel => callback(citadel)),
  getHeadquarterFromDB: callback => socket.on('getHeadquarterFromDB', headquarter => callback(headquarter)),
  getBuildingsFromDB: callback => socket.on('getBuildingsFromDB', buildings => callback(buildings)),
  getBuildingsDataFromDB: callback => socket.on('getBuildingsDataFromDB', buildingsData => callback(buildingsData)),
  getLevelBuildingFromDB: callback => socket.on('getLevelBuildingFromDB', buildingData => callback(buildingData)),

};

export const emit = {
  createCitadel: data => socket.emit('createCitadel', data),
  retrieveCitadel: userId => socket.emit('retrieveCitadel', userId),
  retrieveHeadquarter: citadelId => socket.emit('retrieveHeadquarter', citadelId),
  retrieveBuildings: requestData => socket.emit('retrieveBuildings', requestData),
  addBuildingsData: buildingsData => socket.emit('addBuildingsData', buildingsData),
  retrieveBuildingsData: () => socket.emit('retrieveBuildingsData'),
  levelUpBuilding: (buildingData) => socket.emit('levelUpBuilding',buildingData),
  setRessources: (citadel) => socket.emit('setRessources', citadel),
  setEndUpgradeTime: (buildingData) => socket.emit('setEndUpgradeTime', buildingData),
};
