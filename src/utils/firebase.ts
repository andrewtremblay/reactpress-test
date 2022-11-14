import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  connectAuthEmulator,
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  connectFirestoreEmulator,
  getFirestore,
} from "firebase/firestore/lite";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig: FirebaseOptions = {
  apiKey: "AIzaSyDhtA8_RT9PcLJlVyfqZY12Ckl5jek4ieM",
  authDomain: "reactpress-test.firebaseapp.com",
  projectId: "reactpress-test",
  storageBucket: "reactpress-test.appspot.com",
  messagingSenderId: "1048780800147",
  appId: "1:1048780800147:web:04c4c18092dc3b546e4d66",
  measurementId: "G-15JYH31VTX",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const db = getFirestore(firebaseApp);
if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 9000);
}

export const auth = getAuth(firebaseApp);
if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
}
