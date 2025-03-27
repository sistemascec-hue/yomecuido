import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
export default function GamePoint({ number, icon, size = 90, position }) {
  const router = useRouter();


  // redirigir a ña pantalla segun el numero del gamepoint
  const handlePress = () => {
    router.push(`/niveles/nivel${number}`);
  };
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        {
          width: size,
          height: size,
          top: position?.top || "50%",
          left: position?.left || "50%",
          transform: [{ scale: pressed ? 0.9 : 1 }],
        },
      ]}
      onPress={handlePress}
    >
      {/* Imagen flotante por encima del botón */}
      {icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}

      {/* Capa inferior para sombra */}
      <View style={styles.shadowLayer} />
      <View style={styles.glowLayer} />
      {/* Botón principal con efecto 3D */}
      <LinearGradient
        colors={["#ebe8e6", "#f2eeeb"]}
        style={styles.button}
      >
        {/* Luz superior */}
        <LinearGradient
          colors={["rgba(245, 158, 118, 0.6)", "transparent"]}
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
    perspective: 100, // 📌 Añadir profundidad a la transformación 3D
  },
  shadowLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#ff8c00",
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    top: 7,
    left: 0,
    shadowColor: "#000",
    shadowOffset: { width: 12, height: 12 }, // 📌 Ajustar sombra para efecto inclinado
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    transform: [
      { rotateX: "55deg" }, // 📌 Inclinación en X
      { rotateY: "0deg" }, // 📌 Inclinación en Y
    ],
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 50, // Hacerlo completamente redondo
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 3,
    borderColor: "#cc6502", // Borde oscuro para dar profundidad
    shadowColor: "#050505",
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
    borderBottomLeftRadius: 20,
    opacity: 0.9,

  },
  glowLayer: {
    position: "absolute",
    width: "80%",
    height: "90%",
    top: "-20%",
    backgroundColor: "white",
    borderRadius: 20,
    opacity: 0.6,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    zIndex: -1,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",

  },
  icon: {
    position: "absolute",
    top: -25, // 👈 ajusta según el tamaño de tu botón
    width: "60%",
    height: "60%",
  },
});
