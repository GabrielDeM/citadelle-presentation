import { citadel, currentView } from '../action-type';
import { emit } from '../../../../game/socket/citadel';
import { translateBuildingName } from '../../../../game/utils';
import { citadel as citadelActions } from '../actions';
import { mapDynamicState } from '../../../utils';
import { auth } from '../../global/actions';

const { setUser, } = auth;
const { CREATE_CITADEL, SET_BUILDINGS, UPDATE_RESSOURCES } = citadel;
const { setBuildingLevel, setRessources, setEndUpgradeTime } = citadelActions;
const { SET_BUILDING_LEVEL, } = currentView;

export const createCitadel = store => next => action => {
  if(action.type === CREATE_CITADEL) {
    emit.createCitadel(action.payload);
    const { user } = mapDynamicState('global: auth: user')(store.getState());
    store.dispatch(setUser({ ...user, hasCitadel: true, }));
  }
  next(action);
}

export const setFrenchBuildingsName = store => next => action => {
  if(action.type === SET_BUILDINGS) {
    const newBuildings = action.payload.map(building => ({
      ...building,
      content: translateBuildingName(building.name),
    }));
    action.payload = newBuildings;
  }
  next(action);
}

export const setCitadelBuildingLevel = store => next => action => {
  if(action.type === SET_BUILDING_LEVEL) {
    let newRessources = {};
    let { level, name } = action.payload;
    level = level > 3 ? 3 : level;
    const { headquarter, buildings, buildingsData, citadel } = mapDynamicState('game: citadel: headquarter buildings buildingsData citadel')(store.getState());
    const cost = buildingsData[0].upgrade[name][level-1].ressources;
    const { resources } = citadel;
    const { time } = buildingsData[0].upgrade[name][level-1];
    const endUpgradeTime = time*1000+Date.now();
    for(const key in resources){
      newRessources[key] = Number(resources[key]) - (cost[key] || 0);
    }
    emit.setRessources({_id: citadel._id, resources: newRessources})
    store.dispatch(setRessources(newRessources));
    if(name === 'headquarter' ) {
      const newHeadquarter = {...headquarter, endUpgradeTime, time};
      store.dispatch(setEndUpgradeTime('headquarter', newHeadquarter));
      //store.dispatch(setBuildingLevel('headquarter', { ...headquarter, level }));
    } else {
      const building = buildings.filter(building => building.name === name)[0];
      const newBuilding = buildings.filter(building => building.name !== name);
      store.dispatch(setEndUpgradeTime('buildings', [
        ...newBuilding,
        { ...building, endUpgradeTime, time}
      ]));
      //store.dispatch(setBuildingLevel('buildings', [
        //...newBuilding,
        //{ ...building, level }

      //]));
    }
  }
  next(action);
}

export const updateRessources = store => next => action => {
  if(action.type === UPDATE_RESSOURCES) {
    const {
      citadel,
      buildings,
      buildingsData
    } = mapDynamicState('game: citadel: citadel buildings buildingsData')(store.getState());
    const { resources } = citadel;
    let newRessources = {};
    const warehouse = buildings.filter(building => building.name === 'warehouse')[0];
    const maxStorage = Number(buildingsData[0].upgrade.warehouse[warehouse.level].storage);
    buildings.forEach(building => {
      let { level, name } = building;
      if(
        name === 'oilPlateform' ||
        name === 'ironMine' ||
        name === 'ammoFactory'
      ) {
        level = level > 3 ? 3 : level;
        const production = Number(buildingsData[0].upgrade[name][level].production);
        const ressourceName = name.split(/[A-Z]/)[0];
        let newRessource = Number(resources[ressourceName]) + production;
        newRessource = newRessource > maxStorage ? maxStorage : newRessource;
        newRessources[ressourceName] = newRessource.toFixed(2);
        if(newRessources[ressourceName] !== resources[ressourceName])
        store.dispatch(setRessources(newRessources));
      }
    });
  }
  next(action);
}
