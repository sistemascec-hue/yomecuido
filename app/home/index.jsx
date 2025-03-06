import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Pressable,
} from "react-native";
import Navbar from "../../components/Navbar";
import { auth, db } from "../../firebase";
import { useEffect, useState, useRef } from "react";
import { doc, getDoc } from "firebase/firestore";
import GamePoint from "../../components/GamePoint";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons"; // Asegúrate de instalar @expo/vector-icons si no lo tienes
// import { Animated } from "react-native";
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from "react-native-reanimated";

const { width, height } = Dimensions.get("window");

// Mapas disponibles
const mapBackgrounds = [
  require("../../assets/images/backgrounds/fondojuego1.webp"),
  require("../../assets/images/backgrounds/fondojuego2.webp"),
  require("../../assets/images/backgrounds/fondojuego3.webp"),
  require("../../assets/images/backgrounds/fondojuego4.webp"),
];

// Nombres creativos de los mapas
const mapNames = [
  "🔐 Hackea tu Seguridad: La Aventura de las Contraseñas",
  "🚨 Redes Peligrosas: ¿Amigo o Enemigo?",
  "🌍 Explorador Digital: Travesía por Internet Seguro",
  "🎮 Zona Gamer: Protege tu Identidad en el Juego",
];

export default function HomeScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentMap, setCurrentMap] = useState(0);
  const fadeAnim = useSharedValue(1);
  const scaleAnim = useSharedValue(1);
  // Función para obtener datos del usuario desde Firestore
  const fetchUserData = async () => {
    if (!auth.currentUser) {
      setLoading(false);
      setUsername("Usuario");
      return;
    }

    try {
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists()) {
        setUsername(userDoc.data().username);
      } else {
        setUsername("Usuario");
      }
    } catch (error) {
      console.error("Error al obtener datos del usuario:", error);
      setUsername("Usuario");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  // Crear la animacion de la trancision
  const changeMapWithAnimation = (next) => {
    // Reduce tamaño y desaparece antes del cambio
    scaleAnim.value = withTiming(0.85, { duration: 600 });
    fadeAnim.value = withTiming(0, { duration: 300 });
  
    setTimeout(() => {
      setCurrentMap((prev) => {
        if (next) return prev < mapBackgrounds.length - 1 ? prev + 1 : prev;
        return prev > 0 ? prev - 1 : prev;
      });
  
      // Vuelve a la opacidad normal y hace zoom in después del cambio
      scaleAnim.value = withTiming(1, { duration: 250 });
      fadeAnim.value = withTiming(1, { duration: 600 });
    }, 400);
  };
  
  const animatedMapStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scaleAnim.value }],
    opacity: fadeAnim.value,
  }));
  
  // Renderizar los puntos de juego según el mapa actual
  const renderGamePoints = () => {
    switch (currentMap) {
      case 0:
        return (
          <>
            <GamePoint
              number={1}
              position={{ top: "91%", left: "80%" }}
              onPress={() => router.push("/niveles/nivel1")}
            />
            <GamePoint number={2} position={{ top: "80%", left: "64%" }} />
            <GamePoint number={3} position={{ top: "85%", left: "31%" }} />
          </>
        );
      case 1:
        return (
          <>
            <GamePoint number={4} position={{ top: "80%", left: "70%" }} />
            <GamePoint number={5} position={{ top: "75%", left: "50%" }} />
            <GamePoint number={6} position={{ top: "85%", left: "30%" }} />
          </>
        );
      case 2:
        return (
          <>
            <GamePoint number={7} position={{ top: "80%", left: "60%" }} />
            <GamePoint number={8} position={{ top: "85%", left: "40%" }} />
            <GamePoint number={9} position={{ top: "90%", left: "20%" }} />
          </>
        );
      case 3:
        return (
          <>
            <GamePoint number={10} position={{ top: "78%", left: "50%" }} />
            <GamePoint number={11} position={{ top: "82%", left: "30%" }} />
            <GamePoint number={12} position={{ top: "90%", left: "10%" }} />
          </>
        );
      default:
        return null;
    }
  };

  return (
    <View style={styles.container}>
      <Navbar />
      <View>
        {/* Mensaje de bienvenida */}
        {loading ? (
          <Text style={styles.loadingText}>Cargando...</Text>
        ) : (
          <Text style={[styles.welcomeText, fonts().title]}>
            Hola {username}, bienvenido a YoMeCuido
          </Text>
        )}
      </View>
      {/* Contenido principal */}
      <View style={styles.content}>
        {/* Fondo del mapa actual */}
        <Animated.View style={[styles.animatedContainer, animatedMapStyle]}>
          <ImageBackground
            source={mapBackgrounds[currentMap]}
            style={styles.mapBackground}
            resizeMode="cover"
          >
            <View style={styles.gamePointsContainer}>{renderGamePoints()}</View>
          </ImageBackground>
        </Animated.View>

        {/* Navegación entre mapas */}
        <View style={styles.mapNavigation}>
          <Pressable
            style={({ pressed }) => [
              styles.navButton,
              currentMap === 0 && styles.navButtonDisabled,
              pressed && styles.navButtonPressed, // Efecto al presionar
            ]}
            onPress={() => changeMapWithAnimation(false)}
            disabled={currentMap === 0}
          >
            <Ionicons
              name="chevron-back"
              size={24}
              color={currentMap === 0 ? "#999" : "#fff"}
            />
          </Pressable>

          {/* Mostrar nombre del mapa */}
          <Text style={[styles.mapName, fonts().subtitle2]}>
            {mapNames[currentMap]}
          </Text>

          <Pressable
            style={({ pressed }) => [
              styles.navButton,
              currentMap === mapBackgrounds.length - 1 &&
                styles.navButtonDisabled,
              pressed && styles.navButtonPressed, // Efecto al presionar
            ]}
            onPress={() => changeMapWithAnimation(true)}
            disabled={currentMap === mapBackgrounds.length - 1}
          >
            <Ionicons
              name="chevron-forward"
              size={24}
              color={currentMap === mapBackgrounds.length - 1 ? "#999" : "#fff"}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  animatedContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  content: {
    flex: 1,
  },
  mapBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  welcomeText: {
    color: colors.light.buttonBackground,
    fontSize: 30,
    textAlign: "center",
    backgroundColor: colors.light.highlight,
    zIndex: 1,
  },
  loadingText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 10,
    borderRadius: 5,
    alignSelf: "center",
  },
  gamePointsContainer: {
    flex: 1,
    width: "100%",
    height: "100%",
    position: "relative",
  },
  mapNavigation: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: colors.light.highlight,
  },
  navButton: {
    padding: 10,
    backgroundColor: colors.light.buttonBackground,
    borderRadius: 20,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },

  navButtonPressed: {
    backgroundColor: "rgba(255,255,255,0.4)",
  },
  mapName: {
    color: colors.light.buttonBackground,
    fontSize: 16,
    textAlign: "center",
    flex: 1,
    marginHorizontal: 10,
  },
});
