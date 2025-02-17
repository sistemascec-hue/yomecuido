import { Text, View, ImageBackground, SafeAreaView, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Navbar from "../../components/Navbar";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import GamePoint from "../../components/GamePoint";
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
      <Navbar />

      <ImageBackground
        source={require("../../assets/images/backgrounds/fondojueg.webp")}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          {loading ? (
            <Text style={styles.loadingText}>Cargando...</Text>
          ) : (
            <Text style={styles.welcomeText}>Hola, {username}, bienvenido a YoMeCuido</Text>
          )}

          {/* Puntos de juego (estáticos por ahora) */}
          <View style={styles.gamePointsContainer}>
  <GamePoint number={1} position={{ top: "20%", left: "50%" }} />
  <GamePoint number={2} position={{ top: "40%", left: "50%" }} />
  <GamePoint number={3} position={{ top: "80%", left: "50%" }} />
</View>

        </View>
      </ImageBackground>
    </SafeAreaView>
  );
}

// 🎨 Estilos mejorados
const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    // backgroundColor: "rgba(0, 0, 0, 0.4)", // Efecto de oscurecimiento
  },
  welcomeText: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
  },
  gamePointsContainer: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  gamePoint: {
    position: "absolute",
    width: 50,
    height: 50,
    backgroundColor: "#DCD7C9",
    borderRadius: 100,
    borderWidth: 5,
    borderColor: "white",
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
