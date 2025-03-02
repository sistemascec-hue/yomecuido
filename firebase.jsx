// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_a7ePwZvBoYScyOA1B4Rqk1k8oNUGGKU",
  authDomain: "yomecuido-bd.firebaseapp.com",
  projectId: "yomecuido-bd",
  storageBucket: "yomecuido-bd.firebasestorage.app",
  messagingSenderId: "934370371280",
  appId: "1:934370371280:web:488defe3fbadf385efe0d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db}

