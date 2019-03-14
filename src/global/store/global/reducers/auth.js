import { auth } from '../action-type';

const {
  SET_LOGGED,
  SET_USER,
  LOGOUT,
} = auth;

const authState = {
  logged: false,
  user: {},
};

const authReducer = (state = authState, action) => {
  switch (action.type) {
    case SET_LOGGED:
      return {
        ...state,
        logged: true,
      };
    case SET_USER:
      return {
        ...state,
        user: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: {},
        logged: false,
      };

    default: return { ...state };
  }
}

export default authReducer;
