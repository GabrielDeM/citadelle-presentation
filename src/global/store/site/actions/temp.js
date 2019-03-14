import {
  temp
} from '../action-type';

const {
  SET_FORM_DATA,
  SET_ERROR_MESSAGE,
  SET_USER_CREATED,
  SET_LOGGED,
} = temp;

export const setFormData = (formData, formType) => ({ type: SET_FORM_DATA, payload: formData, form: formType });
export const setErrorMessage = message => ({ type: SET_ERROR_MESSAGE, payload: message });
export const setUserCreated = () => ({ type: SET_USER_CREATED });
export const setLogged = (user, logged) => ({ type: SET_LOGGED, logged: logged, payload: user });
