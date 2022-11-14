import { FirebaseOptions, initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
  connectAuthEmulator,
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { useAuthState as useFirebaseAuthState } from "react-firebase-hooks/auth";

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

export type AppUser = User | undefined | null;

let user: AppUser = undefined;

onAuthStateChanged(auth, (userUpdate) => {
  console.log("user update ", userUpdate);
  if (userUpdate) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    user = userUpdate;
  } else {
    // User is signed out
    user = null;
  }
});

export async function getCurrentUser(): Promise<AppUser> {
  if (auth.currentUser) {
    user = auth.currentUser;
  }
  return Promise.resolve(user);
}

export async function register(email: string, password: string): Promise<User> {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log("register result ", userCredential);
  user = userCredential?.user;
  return userCredential?.user;
}

export async function login(email: string, password: string): Promise<User> {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
  console.log("login result ", userCredential);
  user = userCredential?.user;
  return userCredential?.user;
}

export async function logout(): Promise<boolean> {
  await signOut(auth);
  user = null;
  return true;
}

export const useAuthState = () => useFirebaseAuthState(auth);
