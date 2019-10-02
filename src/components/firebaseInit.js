const firebase = require('firebase');
require('firebase/firebase-firestore');
import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
export default firebaseApp.firestore();
