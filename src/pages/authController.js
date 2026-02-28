// authController.js
// thin wrapper around firebase auth operations so that other parts of app
// don't depend directly on firebase.

import { auth, googleProvider } from './firebase';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut
} from 'firebase/auth';

export const doLogin = (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const doSignup = (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const loginWithGoogle = () => {
  return signInWithPopup(auth, googleProvider);
};

export const doLogout = () => {
  return signOut(auth);
};
