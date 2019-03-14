import { currentView } from '../action-type';

const {
  SET_VIEW_TYPE,
  SET_BUILDING_VIEW,
  SET_CURRENT_BUILDING_DATA,
  SET_BUILDING_LEVEL,
} = currentView;

export const setViewType = viewType => ({ type: SET_VIEW_TYPE, payload: viewType });
export const setBuildingView = buildingView => ({ type: SET_BUILDING_VIEW, payload: buildingView });
export const setCurrentBuildingData = currentBuildingData => ({ type: SET_CURRENT_BUILDING_DATA, payload: currentBuildingData });
export const setBuildingLevel = (level, name) => ({ type: SET_BUILDING_LEVEL, payload: {level, name} });
