import { View, Image, Pressable, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { signOut } from "firebase/auth";
import { auth } from "../firebase"; // Importa Firebase
import { LogoutIcon, MenuIcon, logoutIcon } from "./Icons";
import { Link } from "expo-router";
import colors from "../theme/colors";

const logo = require("../assets/images/small_logos/logo_small1.webp");

export default function Navbar() {
  const router = useRouter(); // Para redirigir al usuario

  const handleLogout = async () => {
    try {
      await signOut(auth); // Cierra la sesión del usuario
      Alert.alert("Sesión cerrada, ", "Has cerrado sesión correctamente.");
      router.replace("/login"); // Redirige al login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
      Alert.alert("Error", "No se pudo cerrar sesión. Intenta de nuevo.");
    }
  };

  return (
    <View style={styles.navbar}>
      {/* Logo */}
      <Image source={logo} style={styles.logo} resizeMode="contain" />

      {/* Botón de cerrar sesión */}
      <Pressable onPress={handleLogout} style={{marginRight: 20,}}>
      {({ pressed }) => <LogoutIcon style={{ opacity: pressed ? 0.5 : 1, color: "#2E1C42"}} />}
      </Pressable>

      {/* Menú hamburguesa */}
      <Link asChild href="#">
        <Pressable>
          {({ pressed }) => <MenuIcon style={{ opacity: pressed ? 0.5 : 1, color: "#2E1C42"}} />}
        </Pressable>
      </Link>
    </View>
  );
}

// 🎨 Estilos mejorados
const styles = StyleSheet.create({
  navbar: {
    width: "100%",
    height: 60,
    backgroundColor: colors.light.navBarBackground,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingHorizontal: 16,
    paddingTop: 10,

  },
  logo: {
    width: 70,
    marginRight:"60%",
    height: 60,
  },

});
