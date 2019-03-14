import { createStore, applyMiddleware, compose } from 'redux';

import state from './globalState';

import middlewares from './globalMiddlewares';
const {
  uploadFormsToMongo,
  logging,
  createCitadel,
  setFrenchBuildingsName,
  currentBuildingData,
  setCitadelBuildingLevel,
  updateRessources,
} = middlewares;

const appliedMiddleware = applyMiddleware(uploadFormsToMongo, logging, createCitadel, setFrenchBuildingsName, currentBuildingData, setCitadelBuildingLevel, updateRessources);

const devTools = [];
if(window.devToolsExtension) {
  devTools.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

const enhancers = compose(appliedMiddleware, ...devTools);
const store = createStore(state, enhancers);

export default store;
