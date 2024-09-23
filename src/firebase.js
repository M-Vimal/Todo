// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAreKIn16wwwYNRIMfv1TLBAM8VBDb-AHM",
  authDomain: "todo-b6c0c.firebaseapp.com",
  projectId: "todo-b6c0c",
  storageBucket: "todo-b6c0c.appspot.com",
  messagingSenderId: "584160659868",
  appId: "1:584160659868:web:05e1bf7dfc739111cfe059",
  measurementId: "G-LFKDZ7JFS8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

