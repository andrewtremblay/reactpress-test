import { getAnalytics } from "firebase/analytics";
import { firebaseApp } from "./app";

export const firebaseAnalytics = getAnalytics(firebaseApp);  
