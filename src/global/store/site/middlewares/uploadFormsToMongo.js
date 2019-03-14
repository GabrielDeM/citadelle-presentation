import { temp } from '../action-type';
import { auth as authActions, temp as tempActions } from '../actions';
import { on, emit } from '../../../../site/socket/auth';

const {
  SET_FORM_DATA,
} = temp;

const {
  setErrorMessage,
  setUserCreated,
  setLogged,
} = tempActions;

const {
  logging,
} = authActions;

export const uploadFormsToMongo = store => next => action => {
  if(action.type === SET_FORM_DATA) {
    if(action.form === 'signup') {
      emit.signup(action.payload)
      on.duplicatedData(duplicatedData => store.dispatch(setErrorMessage(duplicatedData)));
      on.userCreated(() => store.dispatch(setUserCreated()));
    }
    else if(action.form === 'login') {
      emit.login(action.payload);
      on.userNotExist(message => store.dispatch(setErrorMessage(message)));
      on.wrongPassword(message => store.dispatch(setErrorMessage(message)));
      on.logged(user => store.dispatch(setLogged(user)));
    }
    else if(action.form === 'contact') {
    }
    else if(action.form === 'profile') {
      emit.editUserById(action.payload);
      on.logged(user => { console.log(user);
        store.dispatch(setLogged(user));
        store.dispatch(logging());
      });
    }
  }
  next(action);
}
