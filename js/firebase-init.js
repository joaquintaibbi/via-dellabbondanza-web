// firebase-init.js
// Inicializa Firebase (Auth + Firestore) y deja todo disponible en
// window para que el resto del código (scripts clásicos) lo use.

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDgOaG3WS9rWEm3W6NYDD4fBvK_HbedCJI",
  authDomain: "via-dellabbondanza-web.firebaseapp.com",
  projectId: "via-dellabbondanza-web",
  storageBucket: "via-dellabbondanza-web.firebasestorage.app",
  messagingSenderId: "423766393797",
  appId: "1:423766393797:web:1c39c17d968ba60ceb41ac"
};

const app = initializeApp(firebaseConfig);

window.firebaseAuth = getAuth(app);
window.firebaseDb = getFirestore(app);

window.firebaseAuthFns = {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  sendEmailVerification
};

window.firebaseDbFns = {
  doc,
  setDoc,
  getDoc
};