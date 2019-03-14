import { auth } from '../action-type';

const {
  LOGGED,
  LOGOUT,
} = auth;

const authState = {
  logged: false,
};

const authReducer = (state = authState, action) => {
  switch (action.type) {
    case LOGGED:
      return {
        ...state,
        user: action.payload,
        logged: true,
      };

    case LOGOUT:
      return {
        ...state,
        user: null,
        logged: false,
      };

    default: return { ...state };
  }
}

export default authReducer;
