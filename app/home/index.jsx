import {
  Text,
  View,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import { Link } from "expo-router";
import Navbar from "../../components/Navbar";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import GamePoint from "../../components/GamePoint";
import colors from "../../theme/colors";

export default function Home() {
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);

  // Función para obtener datos del usuario desde Firestore
  const fetchUserData = async () => {
    if (!auth.currentUser) return;

    try {
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));

      if (userDoc.exists()) {
        setUsername(userDoc.data().username);
      } else {
        setUsername("Usuario");
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/backgrounds/fondojuego.webp")}
        style={styles.background}
        resizeMode="cover"
      >
        
        <Navbar />
        <View style={styles.overlay}>
          {loading ? (
            <Text style={styles.loadingText}>Cargando...</Text>
          ) : (
            <Text style={styles.welcomeText}>
              Hola {username}, bienvenido a YoMeCuido
            </Text>
          )}

          {/* Puntos de juego (estáticos por ahora) */}
          <View style={styles.gamePointsContainer}>
            <GamePoint number={1} position={{ top: "86%", left: "80%" }} />
            <GamePoint number={2} position={{ top: "76%", left: "64%" }} />
            <GamePoint number={3} position={{ top: "80%", left: "31%" }} />
          </View>
        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

// 🎨 Estilos mejorados
const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    height: "100%",
    width: "100%",
  },
  welcomeText: {
    color: "#2E1C42",
    fontSize: 30,
    fontFamily: "sugo-trial",
    textAlign: "center",
    marginBottom: 20,
    backgroundColor: colors.light.highlight,
    zIndex: 1,
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  gamePointsContainer: {
    width: "100%",
    height: "100%",
    position: 'absolute',
    left: 0,

  },
  linkButton: {
    marginTop: 40,
    padding: 10,
    backgroundColor: "#ffcc00",
    borderRadius: 10,
  },
  linkText: {
    color: "#333",
    fontSize: 16,
    fontWeight: "bold",
  },

});
