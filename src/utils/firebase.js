import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8bcEhY3nSOcHBMwJxxCk--uGliE2fVlQ",
  authDomain: "luxynema.firebaseapp.com",
  projectId: "luxynema",
  storageBucket: "luxynema.appspot.com",
  messagingSenderId: "1031368976002",
  appId: "1:1031368976002:web:569c634f516912f446b69b",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const firestore = getFirestore(app);
