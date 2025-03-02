import React, { useState, useRef } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  Animated,
} from "react-native";
import { AntDesign } from "@expo/vector-icons"; // Ícono para "ver más" y "ver menos"
import colors from "../theme/colors";

export default function MejoraCard  ({ tip }){
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useRef(new Animated.Value(0)).current;

  const toggleExpand = () => {
    Animated.timing(animatedHeight, {
      toValue: isExpanded ? 0 : 150, // Expande o colapsa la tarjeta
      duration: 300,
      useNativeDriver: false,
    }).start();
    setIsExpanded(!isExpanded);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.tipTitle}>
         {tip.title}
      </Text>
      <Image source={tip.image} style={styles.image} />
      <Pressable style={styles.button} onPress={toggleExpand}>
        <Text style={styles.buttonText}>Ver más</Text>
        <AntDesign name={isExpanded ? "up" : "down"} size={20} color="white" />
      </Pressable>

      {/* Animación para la ventana emergente */}
      <Animated.View style={[styles.expandedView, { height: animatedHeight }]}>
        {isExpanded && (
          <View>
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
    borderRadius: 10,
    padding: 15,
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
    shadowColor: "#00000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  tipTitle: {
    fontSize: 18,
    fontFamily: "sugo-trial",
    textAlign: "center",
    marginBottom: 10,
  },
  image: {
    width: 250,
    height: 150,
    borderRadius: 10,
    marginBottom: 10,
  },
  button: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2E1C42",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "sugo-trial",
    marginRight: 10,
  },
  expandedView: {
    overflow: "hidden",
    backgroundColor: "#2E1C42",
    borderRadius: 10,
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  tipDetail: {
    color: "white",
    fontSize: 12,
    marginVertical: 4,
    fontFamily: "roboto-bold",
  },
});
