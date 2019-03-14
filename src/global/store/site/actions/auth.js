import { auth } from '../action-type';

const {
  LOGGING,
  LOGGED,
  LOGOUT,
} = auth;

export const logging = () => ({ type: LOGGING });
export const logged = user => ({ type: LOGGED, payload: user });
export const logout = () => ({ type: LOGOUT });
