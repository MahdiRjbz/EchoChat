import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { getAuth } from 'firebase/auth';
import 'firebase/firestore';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDUDQo8qZVK_hCeKGqC7kO5kkFGCoJ1aXU",
  authDomain: "echochat-9030e.firebaseapp.com",
  databaseURL: "https://echochat-9030e-default-rtdb.firebaseio.com",
  projectId: "echochat-9030e",
  storageBucket: "echochat-9030e.appspot.com",
  messagingSenderId: "148639957065",
  appId: "1:148639957065:web:5be9ebf63ced8aa0de3f98",
  measurementId: "G-D302033613"
}

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp);

