const io = require('../../config')('socket');
const mongoose = require('../../mongoose');
const buildingsName = require('../../data/buildingsName');
const { requestError } = require('../../config')('color');
const { errorLogger } = require('../../utils');

const on = {
  createCitadel: socket => socket.on('createCitadel', data => {
    const userId = data.user._id;
    mongoose.Citadel.createCitadel(data.citadelName, userId)
      .then(citadel => {

        mongoose.Headquarter.createHeadquarter(citadel._id, userId)
          .then(headquarter => {
            const { _id } = headquarter;

            buildingsName.forEach((building, i) => {
              mongoose.Building.createBuilding(building, _id, citadel._id, userId)
                .then(building => {
                  console.log(building);
                  if(i === buildingsName.length - 1) process.env.refreshBuildings = true;
                })
                .catch(err => requestError(err));
            });
          })
          .catch(err => requestError(err));
      })
      .catch(err => requestError(err));

    mongoose.User.hasCitadel(userId, true)
      .then(user => console.log(user))
      .catch(err => requestError(err));
  }),

  retrieveCitadel: socket => socket.on('retrieveCitadel', userId => {
    mongoose.Citadel.getCitadelByUser(userId)
      .then(citadel => {
        citadel && socket.emit('getCitadelFromDB', citadel);
      })
      .catch(err => requestError(err));
  }),

  getAllCitadels: socket => socket.on('getAllCitadels', () => {
    mongoose.Citadel.getAllCitadels()
      .then(citadels => socket.emit('getCitadelsFromDB', citadels))
      .catch(err => requestError(err));
  }),

  getCitadelById: socket => socket.on('getCitadelById', id => {
    mongoose.Citadel.getCitadelById(id)
      .then(citadel => socket.emit('getCitadelFromDB', citadel))
      .catch(err => requestError(err));
  }),

  getAllCitadelsByUser: socket => socket.on('getAllCitadelsByUser', userId => {
    mongoose.Citadel.getAllCitadelsByUser(userId)
      .then(citadels => socket.emit('getCitadelsFromDB', citadels))
      .catch(err => requestError(err));
  }),

  retrieveHeadquarter: socket => socket.on('retrieveHeadquarter', citadelId => {
    mongoose.Headquarter.getHeadquarterByCitadel(citadelId)
      .then(headquarter => socket.emit('getHeadquarterFromDB', headquarter))
      .catch(err => requestError(err));
  }),

  retrieveBuildings: socket => socket.on('retrieveBuildings', requestData => {
    if(typeof requestData === 'string')
      requestData = {
        id: requestData,
        model: 'headquarter',
      };
    mongoose.Building.getBuildingsByHeadquarter(requestData.id, requestData.model)
      .then(buildings => socket.emit('getBuildingsFromDB', buildings))
      .catch(err => requestError(err));
  }),

  addBuildingsData: socket => socket.on('addBuildingsData', buildingsData => {
    mongoose.BuildingsData.addBuildingsData(buildingsData)
      .then(buildingsData => console.log(buildingsData))
      .catch(err => requestError(err))
  }),

  retrieveBuildingsData: socket => socket.on('retrieveBuildingsData', () => {
    mongoose.BuildingsData.getBuildingsData()
      .then(buildingsData => socket.emit('getBuildingsDataFromDB', buildingsData))
      .catch(err => requestError(err))
  }),

  levelUpBuilding: socket => socket.on('levelUpBuilding', buildingData => {
    const requestPromise = new Promise((resolve, reject) => {
      let request;
      if(buildingData.name === 'headquarter') request = mongoose.Headquarter;
      else request = mongoose.Building;
      resolve(request.levelUp(buildingData._id, buildingData.level));
    });
    requestPromise
      .then(buildingData=> socket.emit('getLevelBuildingFromDB', buildingData))
      .catch(err => requestError(err));
  }),

  setRessources : socket => socket.on('setRessources', citadel => {
    mongoose.Citadel.updateRessources(citadel)
      .then(citadel => {
        process.env.refreshBuildings = 'cal';
        process.env.procCitadel = citadel;
        console.log(citadel.resources)
      })
      .catch(err => requestError(err));
  }),

  setEndUpgradeTime : socket => socket.on('setEndUpgradeTime', buildingData => {
    mongoose.Building.setEndUpgradeTime(buildingData._id, buildingData.endUpgradeTime)
      .then(building => console.log(building))
      .catch(err => requestError(err));
  })
};

const emit = {

};

module.exports = {
  ...on,
  ...emit,
};
