import React, { useState, useRef } from "react";
import {
  View,
  Image,
  Pressable,
  StyleSheet,
  Alert,
  Animated,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { LogoutIcon, MenuIcon, LinkIcon, LightlubIcon, PeopleIcon, AnchorIcon, HomeIcon } from "./Icons";
import colors from "../theme/colors";
import fonts from "../theme/fonts"
const logo = require("../assets/images/small_logos/logo_small1.webp");

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuHeight = useRef(new Animated.Value(0)).current;

  // Opciones del menú
  const menuOptions = [
    { title: "Home", route: "/home", icon: <HomeIcon color= "white"/>  },
    { title: "Mejoras Prácticas", route: "/mejoras", icon: <LightlubIcon color= "white"/> },
    { title: "Enlaces Sospechosos", route: "/enlaces", icon: <LinkIcon color= "white"/> },
    { title: "Consejos", route: "/consejos", icon: <AnchorIcon color= "white"/> },
    { title: "Sobre Nosotros", route: "/sobre-nosotros", icon: <PeopleIcon color= "white"/> },
  ];

  // Altura dinámica del menú basada en el número de opciones
  const totalHeight = menuOptions.length * 50; // 50px por opción aprox.

  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(menuHeight, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }).start(() => setIsMenuOpen(false));
    } else {
      setIsMenuOpen(true);
      Animated.timing(menuHeight, {
        toValue: totalHeight,
        duration: 200,
        useNativeDriver: false,
      }).start();
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert("Sesión cerrada", "Has cerrado sesión correctamente.");
      router.replace("/login");
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar sesión. Intenta de nuevo.");
    }
  };

  return (
    <View style={{zIndex: 100,}}>
      <View style={styles.navbar}>
        {/* Logo */}
        <Image source={logo} style={styles.logo} resizeMode="contain" />

        {/* Botón de cerrar sesión */}
        <Pressable onPress={handleLogout} style={{ marginRight: 20 }}>
          <LogoutIcon style={{ color: "#2E1C42" }} />
        </Pressable>

        {/* Menú hamburguesa */}
        <Pressable onPress={toggleMenu}>
          <MenuIcon style={{ color: "#2E1C42" }} />
        </Pressable>
      </View>

      {/* Menú desplegable animado */}
      {isMenuOpen && (
        <Animated.View style={[styles.menu, { maxHeight: menuHeight }]}>
          {menuOptions.map((item, index) => (
            <Pressable
              key={index}
              style={styles.menuItem}
              onPress={() => {
                router.push(item.route);
                toggleMenu(); // Cerrar el menú después de seleccionar una opción
              }}
            >
              <View style={styles.menuItemContent}>
              {item.icon}
              <Text style={[styles.menuText,fonts().button]}>{item.title}</Text>
              </View>
              
            </Pressable>
          ))}
        </Animated.View>
      )}
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  navbar: {
    zIndex: 100,
    width: "100%",
    height: 60,
    backgroundColor: colors.light.navBarBackground,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 10,
  },
  logo: {
    width: 70,
    marginRight: "60%",
    height: 60,
  },
  menu: {
    position: "absolute",
    top: 60,
    right: 0,
    width: "100%",
    backgroundColor: "#4B0076",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,

  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#FFFFFF",
  },
  menuText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: "center",
  },
  
});