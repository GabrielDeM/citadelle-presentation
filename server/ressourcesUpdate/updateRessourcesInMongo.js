const chalk = require('chalk');
const mongoose = require('../mongoose');
const { buildings: _buildings } = require('./buildings');
const { buildingsDataSorting } = require('./buildingsDataSorting');

let buildings;

_buildings.then(data => buildings = data.buildings);

setInterval(() => {
  if(Array.isArray(buildings)) {
    const newBuildings = buildings.filter(building => {
      if(!building.headquarter.citadel) return false;
      return ((building.headquarter.citadel.resources &&
      building.headquarter.citadel.prevResources) &&
      (building.headquarter.citadel.resources.iron !== building.headquarter.citadel.prevResources.iron ||
      building.headquarter.citadel.resources.oil !== building.headquarter.citadel.prevResources.oil ||
      building.headquarter.citadel.resources.ammo !== building.headquarter.citadel.prevResources.ammo))});
    const citadels = newBuildings.map(building => building.headquarter.citadel);

    citadels.forEach(citadel => {
      //if(/zougui/.test(citadel.name)) {
        mongoose.Citadel.updateRessources(citadel)
        .then()
        .catch(err => console.log(err))
      //}
    });
  }
}, 60000);
