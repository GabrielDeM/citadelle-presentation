import { auth } from '../action-type';

const {
  SET_LOGGED,
  SET_USER,
  LOGOUT,
} = auth;

export const setLogged = () => ({ type: SET_LOGGED });
export const setUser = user => ({ type: SET_USER, payload: user });
export const logout = () => ({ type: LOGOUT });
