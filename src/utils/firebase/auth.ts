import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from "firebase/auth";
import { firebaseApp } from "./app";
import { useAuthState as useFirebaseAuthState } from "react-firebase-hooks/auth";

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(firebaseApp);

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
