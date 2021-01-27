import firebase from "firebase";

// Put Your firebase project config details below ...
const firebaseApp = firebase.initializeApp({
  // apiKey: ,
  // authDomain: ,
  // projectId: ,
  // storageBucket: ,
  // messagingSenderId: ,
  // appId: ,
});

const db = firebaseApp.firestore();

export default db;
