import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function GamePoint({ number, size = 60, position, onPress }) {
  return (
    <Pressable
      style={[
        styles.container,
        {
          width: size,
          height: size,
          top: position?.top || "50%",
          left: position?.left || "50%",
        },
      ]}
      onPress={onPress}
    >
      {/* Capa de sombra inferior para más profundidad */}
      <View style={styles.shadowLayer} />

      {/* Botón con degradado para profundidad */}
      <LinearGradient
        colors={["#8B5E3C", "#5A4030"]} // Efecto de profundidad con sombras y luces
        style={styles.button}
      >
        {/* Brillo superior para efecto de luz */}
        <LinearGradient
          colors={["rgba(255,255,255,0.6)", "transparent"]}
          style={styles.lightEffect}
        />
        <Text style={styles.text}>{number}</Text>
      </LinearGradient>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    perspective: 500, // 📌 Añadir profundidad a la transformación 3D
  },
  shadowLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#3D2B1F",
    borderTopEndRadius: 30,
    borderTopStartRadius: 30,
    borderBottomEndRadius: 20,
    borderBottomStartRadius: 20,
    top: 5,
    left: 0,
    shadowColor: "#000",
    shadowOffset: { width: 12, height: 12 }, // 📌 Ajustar sombra para efecto inclinado
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    transform: [
      { rotateX: "40deg" }, // 📌 Inclinación en X
      { rotateY: "0deg" }, // 📌 Inclinación en Y
    ],
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 30, // Hacerlo completamente redondo
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#3D2B1F", // Borde oscuro para dar profundidad
    shadowColor: "#000",
    transform: [
      { rotateX: "55deg" }, // 📌 Inclinación en X
      { rotateY: "0deg" }, // 📌 Inclinación en Y
    ],
  },
  lightEffect: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 100,
    borderTopRightRadius: 100,
    borderBottomLeftRadius:20,
    opacity: 0.9,

  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",

  },
});
