import React from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import MyButton from "../../components/Button";
import { useRouter } from "expo-router";
import fonts from "../../theme/fonts";

export default function Nivel5() {
  const router = useRouter();

  return (
    <ImageBackground
      source={require("../../assets/images/backgrounds/background3.webp")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <Text style={[fonts().title, styles.title]}>¡Bienvenido al Nivel uno!</Text>

        <Text style={[fonts().text, styles.descripcion]}>
          Aquí inicia tu aventura en el segundo mapa. 🚀
        </Text>

        <MyButton
          text="Comenzar Nivel"
          onPress={() => {
            
            console.log("Nivel 5 iniciado");
          }}
        />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  title: {
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  descripcion: {
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
});
