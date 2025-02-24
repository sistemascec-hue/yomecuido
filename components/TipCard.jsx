import React from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import colors from "../theme/colors";
import fonts from "../theme/fonts";

export default function TipCard({ title, image, description }) {
  return (
    <View style={styles.card}>
      <Text style={[styles.subtitle, fonts().subtitle]}>{title}</Text>
      <Image source={image} style={styles.image} resizeMode="contain" />
      <Text style={[styles.description, fonts().text]}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
    shadowColor: "#2E1C42",
    elevation: 2,
  },
  subtitle: {
    color:colors.light.text,
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
    borderColor: colors.light.highlight, // Asegura que el borde sea visible
    overflow: "hidden", // Evita que los bordes se corten
  },
  description: {
    textAlign: "justify",
    color: colors.light.text,
    paddingHorizontal: 5,
    lineHeight: 20,
  },
});
