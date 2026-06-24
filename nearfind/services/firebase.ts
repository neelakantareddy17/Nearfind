import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCFRN2rpmj-9xMWyc_8a7aLYmL8MPMy5kc",
  authDomain: "nearfind-a210a.firebaseapp.com",
  projectId: "nearfind-a210a",
  storageBucket: "nearfind-a210a.firebasestorage.app",
  messagingSenderId: "516164509523",
  appId: "1:516164509523:web:dccb9b5ba4be3c6acf8ba6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);