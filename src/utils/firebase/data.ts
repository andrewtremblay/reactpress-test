import { firebaseApp } from "./app";
import {
  getFirestore,
  collection,
  getDocs,
  DocumentData,
} from "firebase/firestore/lite";

const db = getFirestore(firebaseApp);

// Get the current user from the database
async function getUserList(): Promise<DocumentData[]> {
  const usersCol = collection(db, "users");
  const usersSnapshot = await getDocs(usersCol);
  const userList = usersSnapshot.docs.map((doc) => doc.data());
  return userList;
}
