import { Pressable, Text, StyleSheet } from "react-native";
import { Link } from "expo-router";
import colors from "../theme/colors";
import fonts from "../theme/fonts";
import { useState } from "react";
const MyButton = ({ text, href }) => {
  const [theme, setTheme] = useState("light");
  const themeFonts = fonts(theme);
  return (
    <Link href={href} asChild>
      <Pressable style={styles.button}>
        <Text style={[themeFonts.button]}>{text}</Text>
      </Pressable>
    </Link>
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
  },

});

export default MyButton;
