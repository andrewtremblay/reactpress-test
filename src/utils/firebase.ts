import { initializeApp, FirebaseOptions } from "@firebase/app";
import { getFirestore, connectFirestoreEmulator } from "@firebase/firestore";
import {
  getAuth,
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  connectAuthEmulator,
} from "@firebase/auth";
import type { User } from "@firebase/auth";
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
const firebaseApp = initializeApp(firebaseConfig);
const db = getFirestore();
if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 9000);
}

const auth = getAuth();
if (location.hostname === "localhost") {
  connectAuthEmulator(auth, "http://localhost:9099");
}

export { firebaseApp, db, auth };

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useAuthState = () => useFirebaseAuthState(auth as any);
