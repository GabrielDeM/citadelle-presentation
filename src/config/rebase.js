import Rebase from 're-base';
import firebase from 'firebase/app';
import database from 'firebase/database';
import config from './firebase';

export default Rebase.createClass(firebase.initializeApp(config).database());
