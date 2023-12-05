import firebase from "firebase/compat/app";
import "firebase/compat/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDp-uSgAG8Ax_5xPQ_wRqhM_rRH7xpPqP0",
  authDomain: "reactminiproject-15ad8.firebaseapp.com",
  projectId: "reactminiproject-15ad8",
  storageBucket: "reactminiproject-15ad8.appspot.com",
  messagingSenderId: "734520669264",
  appId: "1:734520669264:web:9e5afe2a70703e430a4d55",
  measurementId: "G-LQMBKEHYXK",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
