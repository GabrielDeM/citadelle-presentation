import { combineReducers } from 'redux';

import citadelReducer from './citadel';
import currentViewReducer from './currentView';
import chatReducer from './chat';

const gameState = combineReducers({
  citadelReducer,
  currentViewReducer,
  chatReducer,
});

export default gameState;
