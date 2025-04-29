import React from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Animated, { FadeInUp, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import colors from "../theme/colors";
import fonts from "../theme/fonts";

export default function TipCard({ title, image, description }) {
  const scale = useSharedValue(1);

  const animatedCardStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View
      entering={FadeInUp.duration(600).delay(100)}
      style={[styles.card, animatedCardStyle]}
    >
      <Pressable
        onPressIn={() => {
          scale.value = withSpring(0.97); // efecto al presionar
        }}
        onPressOut={() => {
          scale.value = withSpring(1);
        }}
        style={{ alignItems: "center" }}
      >
        <Text style={[styles.subtitle, fonts().subtitle]}>{title}</Text>

        <View style={styles.imageContainer}>
          <Image source={image} style={styles.image} resizeMode="cover" />
        </View>

        <Text style={[styles.description, fonts().text]}>{description}</Text>
      </Pressable>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "rgba(0, 0, 0, 0.28)",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  subtitle: {
    color: colors.light.text,
    fontSize: 20,
    marginBottom: 10,
    textAlign: "center",
    letterSpacing: 1,
  },
  imageContainer: {
    width: 170,
    height: 120,
    borderRadius: 20,
    overflow: "hidden",
    borderWidth: 2,
    borderColor: "white",
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  description: {
    textAlign: "justify",
    color: colors.light.text,
    paddingHorizontal: 5,
    lineHeight: 22,
    marginTop: 5,
  },
});
