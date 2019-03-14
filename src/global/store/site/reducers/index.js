import { combineReducers } from 'redux';

import authReducer from './auth';
import tempReducer from './temp';

const siteState = combineReducers({
  authReducer,
  tempReducer,
});

export default siteState;
