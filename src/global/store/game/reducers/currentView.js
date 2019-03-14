import { currentView } from '../action-type';

const {
  SET_VIEW_TYPE,
  SET_BUILDING_VIEW,
  SET_CURRENT_BUILDING_DATA,
  SET_BUILDING_LEVEL,
} = currentView;

const currentViewState = {
  viewType: '',
  buildingView: '',
  currentBuildingData: null,
};

const currentViewReducer = (state = currentViewState, action) => {
  switch (action.type) {
    case SET_VIEW_TYPE:
      return {
        ...state,
        viewType: action.payload,
      };
    case SET_BUILDING_VIEW:
      return {
        ...state,
        buildingView: action.payload,
      };
    case SET_CURRENT_BUILDING_DATA:
      return {
        ...state,
        currentBuildingData: action.payload,
      };
    case SET_BUILDING_LEVEL:
      return {
        ...state,
        currentBuildingData: {
          ...state.currentBuildingData,
          current: {
            ...state.currentBuildingData.current,
            level: action.payload.level,
          }
        },
      };

    default: return { ...state };
  }
}

export default currentViewReducer;
