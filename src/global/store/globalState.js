import { combineReducers } from 'redux';

import { siteState } from './site';
import { gameState } from './game';
import { globalState } from './global';

const state = combineReducers({
  siteState,
  gameState,
  globalState,
});

export default state;
