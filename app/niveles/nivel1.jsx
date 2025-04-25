import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, ImageBackground } from "react-native";
import { useRouter } from "expo-router";
import CuentoInteractivo from "../../components/CuentoInteractivo";
import PreguntasInteractivas from "../../components/PreguntasInteractivas";
import dataNivelLibro1 from "../../data/dataNivelLibro1";
import { CheckIcon, CheckIconfail } from "../../components/Icons";
import MyButton from "../../components/Button";
import { doc, updateDoc } from "firebase/firestore";
import {db, auth} from "../../firebase";  

export default function NivelLibro1() {
  const [fase, setFase] = useState("cuento"); // "cuento" → "preguntas" → "final"
  const [resultados, setResultados] = useState({ aciertos: 0, fallos: 0 });
  const router = useRouter();

  const completarNivel = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
  
      await updateDoc(userRef, {
        "progress.mapa1.nivel1": "completado",
        "progress.mapa1.nivel2": "desbloqueado",
      });
  
      router.replace("/home"); // Redirige al home después de guardar
    } catch (error) {
      console.error("Error al actualizar progreso:", error);
    }
  };
  
  const manejarFinalPreguntas = (aciertos, fallos) => {
    setResultados({ aciertos, fallos });
    setFase("final");
  };

  if (fase === "cuento") {
    return (
      <CuentoInteractivo
        historia={dataNivelLibro1.historia}
        onFinish={() => setFase("preguntas")}
      />
    );
  }

  if (fase === "preguntas") {
    return (
      <PreguntasInteractivas
        preguntas={dataNivelLibro1.preguntas}
        retroalimentacion={dataNivelLibro1.retroalimentacion}
        onFinish={manejarFinalPreguntas}
      />
    );
  }

  const total = resultados.aciertos + resultados.fallos;
  const paso = resultados.aciertos / total >= 0.5;

  return (
    <ImageBackground
            source={require("../../assets/images/backgrounds/background3.webp")}
            style={styles.finalContainer}
            resizeMode="cover"
          >
      <View style={styles.overlay}>
      <Text style={styles.finalTitle}>¡Nivel Completado!</Text>
      <Text style={styles.finalSubtitle}>Has demostrado tus conocimientos 🧠</Text>

      <View style={styles.resultadoBox}>
        <View style={styles.resultadoFila}>
          <CheckIcon color="#4CAF50" />
          <Text style={styles.resultadoTexto}>Aciertos: {resultados.aciertos}</Text>
        </View>
        <View style={styles.resultadoFila}>
          <CheckIconfail color="#F44336" />
          <Text style={styles.resultadoTexto}>Fallos: {resultados.fallos}</Text>
        </View>
      </View>

      {paso ? (
        <MyButton
        text="Continuar"
        onPress={completarNivel}
        />
      
      ) : (
        <>
          <MyButton
            text="Volver a Intentar"
            onPress={() => setFase("cuento")}
            customStyles={{ backgroundColor: "#f7931e" }}
          />
          <MyButton
            text="Salir del Nivel"
            onPress={() => router.replace("/home")}
            customStyles={{ backgroundColor: "#666", marginTop: 10 }}
          />
        </>
      )}

      </View>
      
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  finalContainer: {
    flex: 1,
  },
  finalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#8B5CF6",
    textAlign: "center",
    marginBottom: 10,
  },
  finalSubtitle: {
    fontSize: 18,
    color: "#ccc",
    textAlign: "center",
    marginBottom: 30,
  },
  resultadoBox: {
    backgroundColor: "#2A2A3D",
    padding: 20,
    borderRadius: 16,
    width: "100%",
    maxWidth: 320,
    marginBottom: 30,
  },
  resultadoFila: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  resultadoTexto: {
    fontSize: 18,
    color: "#fff",
  },
  botonFinal: {
    backgroundColor: "#4CAF50",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 6,
  },
  botonTextoFinal: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
});
