import { Text, View, ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Navbar from "../../components/Navbar";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import {doc, getDoc} from "firebase/firestore"

export default function Home() {
  const [username, setUsername ] = useState("");
  const fetchUserData = async () => {
    if (!auth.currentUser) return;
    
    const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
    
    if (userDoc.exists()) {
      setUsername(userDoc.data().username);
    }
  };
  
  useEffect(() => {
    fetchUserData();
  }, []);
  
  return (
    <SafeAreaView style={{flex:1}}>
      

      
      <Navbar />
      <ImageBackground
      source={require("../../assets/images/backgrounds/background.webp")}
      style={styles.background}
        resizeMode="cover"
      >
      <Text>Home</Text>
      <Text style={styles.welcomeText}>Hola, {username}, bienvenido a YoMeCuido</Text>


      <Link href="/Welcome">Go to Welcome</Link>
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles=StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  }
})
