// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRyg7bvIG5gXpKd8J-bFsgcqHATJsI6Gk",
  authDomain: "db-yomecuido.firebaseapp.com",
  projectId: "db-yomecuido",
  storageBucket: "db-yomecuido.firebasestorage.app",
  messagingSenderId: "84898772279",
  appId: "1:84898772279:web:796ac264ce10b16e9e96b2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export {auth, db}