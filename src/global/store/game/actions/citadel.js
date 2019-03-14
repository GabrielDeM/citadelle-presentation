import { citadel } from '../action-type';

const {
  CREATE_CITADEL,
  SET_CITADEL,
  SET_HEADQUARTER,
  SET_BUILDINGS,
  SET_BUILDINGS_DATA,
  SET_CITADEL_BUILDING_LEVEL,
  SET_RESSOURCES,
  UPDATE_RESSOURCES,
  SET_LEVEL_UP,
  SET_END_UPGRADE_TIME,
} = citadel;

export const createCitadel = name => ({ type: CREATE_CITADEL, payload: name });
export const setCitadel = citadel => ({ type: SET_CITADEL, payload: citadel });
export const setHeadquarter = headquarter => ({ type: SET_HEADQUARTER, payload: headquarter });
export const setBuildings = buildings => ({ type: SET_BUILDINGS, payload: buildings });
export const setBuildingsData = buildingsData => ({ type: SET_BUILDINGS_DATA, payload: buildingsData });
export const setBuildingLevel = (prop, building) => ({ type: SET_CITADEL_BUILDING_LEVEL, payload: {prop, building} });
export const updateRessources = () => ({ type: UPDATE_RESSOURCES });
export const setRessources = ressources => ({ type: SET_RESSOURCES, payload: ressources });
export const setLevelUp = buildingData => ({type: SET_LEVEL_UP, payload: buildingData});
export const setEndUpgradeTime = (prop, buildings) => ({type: SET_END_UPGRADE_TIME, payload: { prop, buildings } });
