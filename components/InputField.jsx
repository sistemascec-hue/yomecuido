import React, { useState } from "react";
import { Text, TextInput, View, StyleSheet, TouchableOpacity } from "react-native";
import fonts from "../theme/fonts";
import colors from "../theme/colors";

export default function InputField({ 
  placeholder, 
  Icon: IconComponent, 
  iconColor = "#2E1C42", 
  secureTextEntry = false,
  value,
  onChangeText,
  // Add any other props you might need
}) {
  const [theme, setTheme] = useState("light");
  const themeFonts = fonts(theme);

  return (
    <View style={styles.inputContainer}>
      {IconComponent && <IconComponent color={iconColor} />}
      <TextInput
        style={[styles.input]}
        placeholder={placeholder}
        placeholderTextColor={colors.light.textInput}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    width: "80%",
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 2,
  },
  input: {
    fontFamily: "roboto-bold",
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
});