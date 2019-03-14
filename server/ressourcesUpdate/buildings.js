const mongoose = require('../mongoose');
const { Building } = require('../models');

const getAllBuildings = resolve => {
  mongoose.Building.getAllBuildings()
    .then(buildingList => {
      // on récupère le modèle "Building" qui contient le plugin "deepPopulate"
      // et on met buildingList (le retour de la promise) en 1er paramètre
      // de ce fait, deepPopulate sait que le populate ce fait sur cette objet (ou array d'objet, cela n'a peut d'importance), ensuite ont lui dit sur quel éléments on veut populate (séparés par des points) et qui sont dans l'objet (ou [object]) qu'on lui a donner en 1er paramètre
      // donc ici il va populate "headquarter" qui est dans chacun de nos objets, puis dans "citadel" qui est dans
      // le headquarter qui est lui même dans chacun de nos objet (d'où le nom "deep populate")
      Building.deepPopulate(buildingList, 'headquarter.citadel.user').then(buildingList => {
        // on récupère seulement les bâtiments de production
        const newBuildings = buildingList.filter(current =>
          current.name === 'oilPlateform' ||
          current.name === 'ironMine' ||
          current.name === 'ammoFactory');
          const warehouses = buildingList.filter(building => building.name === 'warehouse');
          const buildings = newBuildings;
          resolve({
            buildings,
            warehouses,
          });
      });
    })
    .catch(err => console.log(err));
}

// on récupère les buildingsData
const getBuildingsData = resolve => {
  mongoose.BuildingsData.getBuildingsData().then(data => resolve(data));
}

let buildings;
let buildingsData;

const refreshBuildingsAndData = callback => {
  buildings = new Promise((resolve, reject) => {
    getAllBuildings(resolve);
  });
  buildingsData = new Promise((resolve, reject) => {
    getBuildingsData(resolve);
  });
  process.env.newCitadel = false;
  callback && callback(buildings, buildingsData);
}
refreshBuildingsAndData();

exports.buildings = buildings;
exports.buildingsData = buildingsData;
exports.refreshBuildingsAndData = refreshBuildingsAndData;
