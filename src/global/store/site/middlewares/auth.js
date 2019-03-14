import { auth } from '../action-type';
import { auth as authActions } from '../actions';
import { auth as globalAuthActions } from '../../global/actions';

const {
  LOGGING,
} = auth;

const {
  logged,
} = authActions;

const {
  setLogged,
  setUser,
} = globalAuthActions;

export const logging = store => next => action => {
  if(action.type === LOGGING) {
    const { user } = store.getState().siteState.tempReducer;
    store.dispatch(logged(user));
    store.dispatch(setLogged());
    store.dispatch(setUser(user));
  }
  next(action);
}
