import React from "react";
import { View, Text, Pressable, StyleSheet, Image } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
export default function GamePoint({ number, icon, size = 90, position, estado = "bloqueado" }) {
  const router = useRouter();


  // redirigir a ña pantalla segun el numero del gamepoint
  const handlePress = () => {
    if (estado !== "bloqueado") {
      router.push(`/niveles/nivel${number}`);
    } else {
      Alert.alert("Nivel bloqueado", "Completa el anterior para desbloquear este nivel.");
    }
  };

  const isBloqueado = estado === "bloqueado";
  const isCompletado = estado === "completado";
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
          opacity: isBloqueado ? 0.4 : 1,
        },
      ]}
      onPress={handlePress}
      disabled={isBloqueado}
    >
      {/* Imagen flotante por encima del botón */}
      {icon && <Image source={icon} style={styles.icon} resizeMode="contain" />}

      {/* Sombra inferior */}
      <View style={[styles.shadowLayer, isCompletado && { backgroundColor: "#f7931e" }]} />
      {/* Efecto glow */}
      <View style={[styles.glowLayer, isCompletado && { backgroundColor: "#0ad13f" }]} />
      {/* Botón principal con efecto 3D */}
      {/* "#ebe8e6", "#f2eeeb" */}
      <LinearGradient
        colors={isCompletado ? ["#37ff00", "#5ff566"] : ["#ebe8e6", "#f2eeeb"]}
        style={[
          styles.button,
          isCompletado && { borderColor: "#fc9905" }
        ]}
      >
        {/* rgba(245, 158, 118, 0.6) */}
        <LinearGradient
          colors={["rgb(240, 103, 40)", "transparent"]}
          style={styles.lightEffect}
        />
        {!icon && <Text style={styles.text}>{number}</Text>}
      </LinearGradient>
    </Pressable>

  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    perspective: 100, // Añadir profundidad a la transformación 3D
  },
  shadowLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    backgroundColor: "#f7931e",
    borderTopEndRadius: 40,
    borderTopStartRadius: 40,
    borderBottomEndRadius: 40,
    borderBottomStartRadius: 40,
    top: 5,
    left: 0,
    transform: [
      { rotateX: "60deg" }, // Inclinación en X
      { rotateY: "0deg" }, // Inclinación en Y
    ],
    zIndex: 10,
  },
  button: {
    width: "100%",
    height: "100%",
    borderRadius: 50, // Hacerlo completamente redondo
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 8,
    borderColor: "#fc9905", // Borde oscuro para dar profundidad
    shadowColor: "#171615",
    transform: [
      { rotateX: "65deg" }, // Inclinación en X
      { rotateY: "0deg" }, // Inclinación en Y
    ],
    zIndex: 25,
  },
  lightEffect: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "100%",
    // borderTopLeftRadius: 100,
    // borderTopRightRadius: 10,
    // borderBottomLeftRadius: 10,
    borderRadius: 100,
    opacity: 1,
    zIndex: 1,

  },
  glowLayer: {
    position: "absolute",
    width: "100%",
    height: "100%",
    top: "-21%",
    backgroundColor: "white",
    borderTopEndRadius: 15,
    borderTopStartRadius: 15,
    borderBottomEndRadius: 24,
    borderBottomStartRadius: 24,
    opacity: 0.6,
    shadowColor: "#fff",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 40,
    zIndex: -10,
  },
  text: {
    fontSize: 28,
    fontWeight: "bold",
    color: "black",

  },
  icon: {
    position: "absolute",
    top: -15, // ajusta según el tamaño de tu botón
    width: "70%",
    height: "70%",
    zIndex: 30,
    shadowColor: "rgba(66, 62, 61, 0.6)",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 10,
  },
});
