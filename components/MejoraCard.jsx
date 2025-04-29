import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import colors from "../theme/colors";

export default function MejoraCard({ tip }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : tip.details.length * 30 + 20, // Dinámico según cantidad de detalles
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.tipTitle}>{tip.title}</Text>

      <View style={styles.imageContainer}>
        <Image source={tip.image} style={styles.image} resizeMode="cover" />
      </View>

      <Pressable style={styles.button} onPress={toggleExpand}>
        <Text style={styles.buttonText}>
          {isExpanded ? "Ver menos" : "Ver más"}
        </Text>
        <AntDesign name={isExpanded ? "up" : "down"} size={20} color="#fff" />
      </Pressable>

      {/* Vista expandible */}
      <Animated.View style={[styles.expandedView, { height: animatedHeight }]}>
        {isExpanded && (
          <View style={styles.detailsContainer}>
            {tip.details.map((detail, index) => (
              <Text key={index} style={styles.tipDetail}>
                {detail}
              </Text>
            ))}
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFBC42",
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
    width: "100%",
    marginBottom: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
  },
  tipTitle: {
    fontSize: 22,
    fontFamily: "sugo-trial",
    textAlign: "center",
    marginBottom: 15,
    color: "#2E1C42",
  },
  imageContainer: {
    width: 260,
    height: 160,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#2E1C42",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E1C42",
    paddingVertical: 10,
    paddingHorizontal: 25,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "sugo-trial",
    marginRight: 8,
  },
  expandedView: {
    overflow: "hidden",
    width: "100%",
    backgroundColor: "#2E1C42",
    borderRadius: 12,
    marginTop: 10,
  },
  detailsContainer: {
    padding: 5,
  },
  tipDetail: {
    color: "#fff",
    fontSize: 14,
    fontFamily: "roboto-bold",
    marginBottom: 6,
    lineHeight: 20,
  },
});
