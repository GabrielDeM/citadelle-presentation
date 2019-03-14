import { citadel } from '../action-type';

const {
  SET_CITADEL,
  SET_HEADQUARTER,
  SET_BUILDINGS,
  SET_BUILDINGS_DATA,
  SET_CITADEL_BUILDING_LEVEL,
  SET_RESSOURCES,
  SET_LEVEL_UP,
  SET_END_UPGRADE_TIME,
} = citadel;


const citadelState = {
  citadel: {},
  headquarter: {},
  buildings: [],
  buildingsData: [],
};

const citadelReducer = (state = citadelState, action) => {
  switch (action.type) {
    case SET_CITADEL:
      return {
        ...state,
        citadel: action.payload,
      };
    case SET_HEADQUARTER:
      return {
        ...state,
        headquarter: action.payload,
      };
    case SET_BUILDINGS:
      return {
        ...state,
        buildings: action.payload,
      };
    case SET_BUILDINGS_DATA:
      return {
        ...state,
        buildingsData: action.payload,
      };
    case SET_CITADEL_BUILDING_LEVEL:
      const { prop, building } = action.payload;
      return {
        ...state,
        [prop]: building,
      };
    case SET_RESSOURCES:
      return {
        ...state,
        citadel: {
          ...state.citadel,
          resources: action.payload,
        },
      };

      case SET_LEVEL_UP:
      return {
        ...state,
        currentBuildingData: {
          ...state.currentBuildingData,
          current: {
            ...state.currentBuildingData.current,
            level: action.payload,
          },
        },
      };

      case SET_END_UPGRADE_TIME: {
        const { prop, buildings } = action.payload;
        return {
          ...state,
          [prop]: buildings
        };
      };


    default: return { ...state };
  }
}

export default citadelReducer;
