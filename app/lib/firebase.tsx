import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const app = initializeApp({
  apiKey: "AIzaSyCBt1O9xf4VxWR3lyL1LBZan6h7r11wyxM",
  authDomain: "shim-a5d2a.firebaseapp.com",
  projectId: "shim-a5d2a",
  storageBucket: "shim-a5d2a.appspot.com",
  messagingSenderId: "293646921103",
  appId: "1:293646921103:web:be3e2d34e6e92e5f732ffa",
  measurementId: "G-PYD2LBMGFB",
});

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Firebase Firestore and get a reference to the service
const db = getFirestore(app);

export { app, auth, db };
