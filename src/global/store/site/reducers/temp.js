import { temp } from '../action-type';

const {
  SET_ERROR_MESSAGE,
  SET_USER_CREATED,
  SET_LOGGED,
} = temp;

const tempState = {
  errorMessage: '',
  userCreated: false,
  duplicatedData: '',
  logged: false,
  user: {},
};

const tempReducer = (state = tempState, action) => {
  switch (action.type) {
    case SET_ERROR_MESSAGE:
      return {
        ...state,
        errorMessage: action.payload,
      };
    case SET_USER_CREATED:
      return {
        ...state,
        userCreated: true,
      };
    case SET_LOGGED:
      return {
        ...state,
        user: action.payload,
        logged: action.logged === undefined ? true : action.logged,
      };

    default: return { ...state };
  }
};

export default tempReducer;
