import firebase from 'firebase/app';
import 'firebase/database';

export const db = firebase.initializeApp({ databaseURL: 'https://vuemod5app6-default-rtdb.firebaseio.com' }).database();
