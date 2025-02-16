import { Text, View, ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Navbar from "../../components/Navbar";
export default function Home() {
  return (
    <SafeAreaView style={{flex:1}}>
      

      
      <Navbar />
      <ImageBackground
      source={require("../../assets/images/backgrounds/background.webp")}
      style={styles.background}
        resizeMode="cover"
      >
      <Text>Home</Text>
      <Text>Welcome to the Home scrsseen!</Text>

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
