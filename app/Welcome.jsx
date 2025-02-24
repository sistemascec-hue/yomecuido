import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  ActivityIndicator,
  Image,
  SafeAreaView
} from "react-native";
import { useRouter } from "expo-router";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import globalStyle from "../constants/globalStyles";

export default function Welcome() {
  const [theme, setTheme] = useState("light");
  const themeFonts = fonts(theme);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState(false); // Estado para controlar la carga
  const [showContent, setShowContent] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView style={{flex:1}}>
      {!isLoaded && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={colors.light.highlight} />
        </View>
      )}

      <ImageBackground
        source={require("../assets/images/backgrounds/background.webp")}
        style={styles.background}
        onLoad={() => setIsLoaded(true)} // Marca la imagen como cargada
      >
        {isLoaded && (
          <View style={globalStyle.container}>
            <View style={styles.image}>
            <Image
              source={require("../assets/images/logos/logo4.webp")}
              style={styles.logo}
            />

            </View>
            
            <Text style={[styles.subText]}>
              ¿Cuidas tu información adecuadamente?{"\n"}
              YOMECUIDO te enseñará cómo hacerlo
            </Text>

            {/* Botón con efecto de borde al presionar */}
            <View style={styles.buttonWrapper}>
              <Pressable
                onPress={() => router.push("/login")}
                style={({ pressed }) => [
                  styles.button,
                  pressed && styles.buttonPressed,
                ]}
              >
                <Text style={styles.buttonText}>Comenzar</Text>
              </Pressable>
            </View>
          </View>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  loaderContainer: {
    position: "absolute", // Asegura que cubra todo encima de otros elementos
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
    backgroundColor: "#fff", // Puedes cambiarlo según el diseño
    zIndex: 10, // Asegura que esté por encima de todo
  },
image:{
  justifyContent: "center",
  alignItems: "center",
},
  subText: {
    fontFamily: "sugo-trial",
    lineHeight: 30,
    textAlign: "center",
    marginBottom: 40,
    marginTop: 20,
    fontSize: 24,
    color: "white"
  },
  buttonWrapper: {
    padding: 4,
    borderWidth: 2,
    borderRadius: 12,
    borderColor: "white",
    marginHorizontal: 80
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 10,
    
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonPressed: {
    borderWidth: 3,
    borderColor: "gray",
  },
  buttonText: {
    color: colors.light.highlight,
    fontFamily: "sugo-trial",
    fontSize: 30,
    textAlign: "center",
  },
  logo: {
    marginTop:70,
    height: 300,
    width: 400,
  },
});
