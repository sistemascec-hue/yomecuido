// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_a7ePwZvBoYScyOA1B4Rqk1k8oNUGGKU",
  authDomain: "yomecuido-bd.firebaseapp.com",
  projectId: "yomecuido-bd",
  storageBucket: "yomecuido-bd.firebasestorage.app",
  messagingSenderId: "934370371280",
  appId: "1:934370371280:web:488defe3fbadf385efe0d5"
};

const app = initializeApp(firebaseConfig);

// Auth compatible con Web y React Native
const auth = Platform.OS === "web"
  ? getAuth(app) // Para Web
  : initializeAuth(app, {
      persistence: getReactNativePersistence(AsyncStorage), // Para React Native
    });

const db = getFirestore(app);

export { auth, db };