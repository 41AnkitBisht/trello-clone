// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore, serverTimestamp} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyATDeAaQglNKi0vwYPrxV9S7jcmUNHdG4E",
  authDomain: "trello-clone-7e110.firebaseapp.com",
  projectId: "trello-clone-7e110",
  storageBucket: "trello-clone-7e110.appspot.com",
  messagingSenderId: "1051458961493",
  appId: "1:1051458961493:web:dfd5a7a4cbd444600654dc",
  measurementId: "G-3FLYFB66C0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db= getFirestore();
const timestamp = serverTimestamp();

export {app,db,timestamp}
