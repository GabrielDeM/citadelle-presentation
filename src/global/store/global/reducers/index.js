import { combineReducers } from 'redux';

import authReducer from './auth';

const globalState = combineReducers({
  authReducer,
});

export default globalState;
