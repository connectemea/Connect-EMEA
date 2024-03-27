import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBxFxojqLf6tlgfQvehE1RNExCPrEszuCw",
  authDomain: "connect-portfolio.firebaseapp.com",
  projectId: "connect-portfolio",
  storageBucket: "connect-portfolio.appspot.com",
  messagingSenderId: "308934822913",
  appId: "1:308934822913:web:c4c7ff75acc7a7dcbd0400"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

export const db = getFirestore(app);
export const storage = getStorage(app);