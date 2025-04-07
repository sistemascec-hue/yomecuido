import { Pressable, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import { useState } from "react";

const MyButton = ({ text, href, onPress }) => {
  const [theme, setTheme] = useState("light");
  const themeFonts = fonts(theme);
  const router = useRouter();

  const handlePress = () => {
    if (onPress) {
      onPress(); // Ejecutar función personalizada
    } else if (href) {
      router.push(href); // Navegación por href
    }
  };

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [
        styles.button,
        pressed && styles.buttonPressed,
      ]}
    >
      <Text style={[themeFonts.button, styles.text]}>{text}</Text>
    </Pressable>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.light.buttonBackground,
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
  buttonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },
  text: {
    color: colors.light.text,
    fontFamily: "sugo-trial",
  },
});

export default MyButton;
