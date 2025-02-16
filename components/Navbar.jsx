import { View, Text, Image, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { MenuIcon, MoonIcon } from "./Icons";
import { Link } from "expo-router";
import colors from "../theme/colors";
const logo = require("../assets/images/small_logos/logo_small1.webp");

export default function Navbar() {
  return (
    <View style={styles.navbar}>
      {/* Logo */}
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      {/* Botón de modo oscuro */}

      {/* Menú hamburguesa */}
      <Link asChild href="#">
        <Pressable>
          {({ pressed }) => <MenuIcon style={{ opacity: pressed ? 0.5 : 1, color: "#2E1C42"}} />}
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: 60,
    backgroundColor: colors.light.navBarBackground,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  logo: {
    width: 50,
    height: 60,
  },
});
