import { Pressable, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import { useState } from "react";

const MyButton = ({ text, href, onPress, disabled = false, variant = "default" }) => {
  const [theme, setTheme] = useState("light");
  const themeFonts = fonts(theme);
  const router = useRouter();

  const backgroundColors = {
    default: colors.light.buttonBackground,
    disabled: "#555555", // gris
    pregunta: "#8B5CF6", // morado
    cuento: "#6B21A8", // morado
    success: "#4CAF50", // verde 
    danger: "#F44336", // rojo
  };

  const colorFondo = disabled
    ? backgroundColors["disabled"]
    : backgroundColors[variant] || backgroundColors["default"];

  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (href) {
      router.push(href);
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: colorFondo,
          opacity: disabled ? 0.6 : 1,
          transform: [{ scale: pressed ? 0.97 : 1 }],
        },
      ]}
    >
      <Text style={[themeFonts.button, styles.text]}>{text}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    color: colors.light.text,
    fontFamily: "sugo-trial",
  },
});

export default MyButton;
