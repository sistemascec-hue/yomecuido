import {
  Text,
  View,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Navbar from "../../components/Navbar";
import { auth, db } from "../../firebase";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import GamePoint from "../../components/GamePoint";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import { useRouter } from "expo-router";
import { Ionicons } from '@expo/vector-icons'; // Asegúrate de instalar @expo/vector-icons si no lo tienes

const { width, height } = Dimensions.get("window");

// Mapas disponibles
const mapBackgrounds = [
  require("../../assets/images/backgrounds/fondojuego1.webp"),
  require("../../assets/images/backgrounds/fondojuego2.webp"),
  require("../../assets/images/backgrounds/fondojuego3.webp"),
  require("../../assets/images/backgrounds/fondojuego4.webp"),
];

export default function HomeScreen() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentMap, setCurrentMap] = useState(0);

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

  // Navegación entre mapas
  const goToNextMap = () => {
    setCurrentMap((prev) => (prev < mapBackgrounds.length - 1 ? prev + 1 : prev));
  };

  const goToPreviousMap = () => {
    setCurrentMap((prev) => (prev > 0 ? prev - 1 : prev));
  };

  // Renderizar los puntos de juego según el mapa actual
  const renderGamePoints = () => {
    switch(currentMap) {
      case 0:
        return (
          <>
            <GamePoint number={1} position={{ top: "91%", left: "80%" }} onPress={() => router.push("/niveles/nivel1")} />
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
        <ImageBackground
          source={mapBackgrounds[currentMap]}
          style={styles.mapBackground}
          resizeMode="cover"
        >
          
          
          {/* Contenedor de los puntos de juego */}
          <View style={styles.gamePointsContainer}>
            {renderGamePoints()}
          </View>
          </ImageBackground>
          {/* Navegación entre mapas */}
          <View style={styles.mapNavigation}>
            <TouchableOpacity 
              style={[styles.navButton, currentMap === 0 && styles.navButtonDisabled]} 
              onPress={goToPreviousMap}
              disabled={currentMap === 0}
            >
              <Ionicons name="chevron-back" size={24} color={currentMap === 0 ? "#999" : "#fff"} />
            </TouchableOpacity>
            
            <Text style={styles.mapIndicator}>
              Mapa {currentMap + 1}/{mapBackgrounds.length}
            </Text>
            
            <TouchableOpacity 
              style={[styles.navButton, currentMap === mapBackgrounds.length - 1 && styles.navButtonDisabled]} 
              onPress={goToNextMap}
              disabled={currentMap === mapBackgrounds.length - 1}
            >
              <Ionicons name="chevron-forward" size={24} color={currentMap === mapBackgrounds.length - 1 ? "#999" : "#fff"} />
            </TouchableOpacity>
          </View>
        
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
  },
  mapBackground: {
    flex: 1,
    width: "100%",
    height: "100%",
    //marginTop: -80, // solo por motivos de posicion de la pantalla
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  navButton: {
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.3)",
    borderRadius: 20,
  },
  navButtonDisabled: {
    opacity: 0.5,
  },
  mapIndicator: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});