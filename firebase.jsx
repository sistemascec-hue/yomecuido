// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { initializeAuth, getReactNativePersistence } from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
const auth = initializeAuth(app,{
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
export {auth, db}

