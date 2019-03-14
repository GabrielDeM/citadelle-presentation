const { buildings: _buildings, buildingsData: _buildingsData, refreshBuildingsAndData } = require('./buildings');
const { users, ressources } = require('./usersRessources');

let buildings;
let warehouses;
let buildingsData;

_buildings.then(data => {
  buildings = data.buildings;
  warehouses = data.warehouses;
});

_buildingsData.then(data => buildingsData = data);

// toute les 5 secondes on effectue cette fonction
setInterval(() => {
  if(process.env.refreshBuildings === 'true') refreshBuildingsAndData((_buildings, _buildingsData) => {
    _buildings.then(data => {
      buildings = data.buildings;
      warehouses = data.warehouses;
    });
    _buildingsData.then(data => buildingsData = data);
  });
  else if(process.env.refreshBuildings === 'cal') {
    const { procCitadel } = process.env;
    let citadelIndex = 0;
    console.log(buildings[0].headquarter.citadel)
    const citadel = buildings.filter((building, i) => {
      citadelIndex = i;
      if(!building.headquarter.citadel) return false;
      return building.headquarter.citadel._id === procCitadel._id
    })[0];
    if(!citadel) return;
    const { resources } = citadel;
    for(const key in resources) {
      const ressourceName = building.name.split(/[A-Z]/)[0];
      buildings[citadelIndex].headquarter.citadel.resources[ressourceName] = resources[ressourceName] - procCitadel.ressources[ressourceName];
    }
    console.log(buildings[citadelIndex].headquarter.citadel.resources)
    process.env.refreshBuildings === null;
  }
  if(buildings) {
    buildings.forEach(building => {
      const currentWarehouse = warehouses.filter(warehouse => warehouse.headquarterId === building.headquarterId)[0];
      // on récupère la production en fonction du niveau du bâtiment (et de son nom)
      const buildingLevel = buildingsData[0].upgrade[building.name][building.level];
      if(buildingLevel) {
        const production = buildingLevel.production;
        const storage = buildingsData[0].upgrade.warehouse[currentWarehouse.level].storage;
        const { citadel } = building.headquarter;
        if(!citadel) return;
        // les nom de bâtiment commence par les nom de ressources, mais ne contient pas que ça
        // donc on veut le split en un array
        // - index-0: qui contient le nom de la ressource
        // - index-1: le reste
        // donc comme on sait que juste après la dernière lettre du nom de la ressource
        // la lettre est une majuscule (exemple: ammoFactory), il y a "ammo" et "Factory" dont "Factory"
        // commence par une majuscule
        // donc on fait une regex qui va split la string à chaque majuscule, ce qui fait qu'on récupère
        // oilPlateform => ['oil', 'Plateform']
        // ironMine => ['iron', 'Mine']
        // ammoFactory => ['ammo', 'Factory']
        const ressourceName = building.name.split(/[A-Z]/)[0];

        const citaUserName = `${citadel.user.username}-${citadel.name}`;
        const userIndex = users.indexOf(citaUserName);
        if (userIndex === -1) {
          users.push(citaUserName);
          const newPrevRessource = {
            [ressourceName]: citadel.resources[ressourceName],
          };
          ressources.push(newPrevRessource)
        } else {
          // update the prevRessources in ressources
          const newPrevRessource = {
            ...ressources[userIndex],
            [ressourceName]: citadel.resources[ressourceName],
          };
          ressources[userIndex] = newPrevRessource;
        }

        building.headquarter.citadel.prevResources = {};
        building.headquarter.citadel.prevResources[ressourceName] = citadel.resources[ressourceName];
        let newRessource = citadel.resources[ressourceName] + (production * 5);
        newRessource = newRessource.toFixed(2);
        if (newRessource > storage) newRessource = storage;
        building.headquarter.citadel.resources[ressourceName] = newRessource;
        // et on fait "production * 5" car le code est éxécuter toute les 5 secondes et la production est une
        // production par seconde
      }
    });
  }
}, 5000);
