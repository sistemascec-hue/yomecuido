import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../theme/colors";
import fonts from "../theme/fonts";

export default function TipCard({ title, image, description }) {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontFamily: "sugo-trial",
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  image: {
    width: 160,
    height: 110,
    marginBottom: 10,
    borderRadius: 30,  // Ajusta el radio proporcionalmente
    borderWidth: 2,
    borderColor: "black", // Asegura que el borde sea visible
    overflow: "hidden", // Evita que los bordes se corten
  },
  description: {
    fontFamily: "sugo-trial",
    fontSize: 20,
    textAlign: "center",
  },
});
