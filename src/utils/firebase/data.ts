import { firebaseApp } from "./app";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
  connectFirestoreEmulator,
} from "firebase/firestore/lite";

const db = getFirestore(firebaseApp);

if (location.hostname === "localhost") {
  connectFirestoreEmulator(db, "localhost", 9000);
}

// Get the current user from the database
async function getUserList(): Promise<DocumentData[]> {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const userList = usersSnapshot.docs.map((doc) => doc.data());
  return userList;
}
