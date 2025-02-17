import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
export default function GamePoint({ number, size = 50, position, onPress }) {
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
    },
    shadowLayer: {
      position: "absolute",
      width: "100%",
      height: "100%",
      backgroundColor: "#3D2B1F",
      borderRadius: 15,
      top: 5,
      
      shadowColor: "#000",
      shadowOffset: { width: 4, height: 4 },
      shadowOpacity: 0.5,
      shadowRadius: 6,
      elevation: 10, // Sombra más pronunciada en Android
    },
    button: {
      width: "100%",
      height: "100%",
      borderRadius: 15,
      alignItems: "center",
      justifyContent: "center",
      borderWidth: 1,
      borderColor: "#3D2B1F", // Borde oscuro para dar profundidad
      shadowColor: "#000",
      shadowOffset: { width: -2, height: -2 },
      shadowOpacity: 0.3,
      shadowRadius: 5,
      elevation: 5, // Segunda capa de sombra
    },
    lightEffect: {
      position: "absolute",
      top: 0,
      width: "100%",
      height: "40%",
      borderTopLeftRadius: 15,
      borderTopRightRadius: 15,
    },
    text: {
      fontSize: 24,
      fontWeight: "bold",
      color: "#FFFFFF",
      textShadowColor: "rgba(0, 0, 0, 0.3)",
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 3,
    },
  });