import { currentView } from '../action-type';
import { currentView as currentViewActions } from '../actions';
import { mapDynamicState } from '../../../utils';

const {
  SET_BUILDING_VIEW,
} = currentView;
const {
  setCurrentBuildingData,
} = currentViewActions;

export const currentBuildingData = store => next => action => {
  if(action.type === SET_BUILDING_VIEW) {
    const props = mapDynamicState('game: citadel: citadel headquarter buildings buildingsData')(store.getState());
    // la fonction mapDynamicState doit récupéré le state de redux en paramètre de la seconde fonction (chose qui est faite automatiquement quand on le met dans la fonction "connect" de redux)
    const { headquarter, buildings, buildingsData } = props;
    headquarter.name = 'headquarter';
    headquarter.content = 'Quartier Général';
    // on met défini le "name" et le "content" de "headquarter" car par défaut il n'y en a pas
    const currentBuilding = buildings.filter(building => building.name.toLowerCase() === action.payload.toLowerCase())[0] || headquarter;
    // si le nom du bâtiment est "headquarter" le filter renverras "undefined" car headquarter n'est pas dans
    // l'array "buildings" donc si le filter return "undefined" on met "headquarter" dans "currentBuilding"

    const currentBuildingData = buildingsData[0].upgrade[currentBuilding.name];
    currentBuildingData.current = currentBuilding;
    store.dispatch(setCurrentBuildingData(currentBuildingData));
  }
  next(action);
}
