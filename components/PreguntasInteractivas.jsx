import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet, Alert } from "react-native";
import fonts from "../theme/fonts";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import MyButton from "./Button";
export default function PreguntasInteractivas({ preguntas, retroalimentacion, onFinish }) {
  const [indice, setIndice] = useState(0);
  const [seleccionada, setSeleccionada] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [respuestaFinalizada, setRespuestaFinalizada] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [fallos, setFallos] = useState(0);
  const router = useRouter();

  const preguntaActual = preguntas[indice];
  const retro = retroalimentacion[indice];
  const progreso = ((indice + (respuestaFinalizada ? 1 : 0)) / preguntas.length) * 100;

  const comprobar = () => {
    if (!seleccionada) return;
    if (seleccionada === preguntaActual.respuestaCorrecta) {
      setFeedback(retro.correcto);
      setAciertos((prev) => prev + 1);
    } else {
      setFeedback(preguntaActual.reflexion);
      setFallos((prev) => prev + 1);
    }
    setRespuestaFinalizada(true);
  };

  const siguientePregunta = () => {
    if (indice < preguntas.length - 1) {
      setIndice(indice + 1);
      setSeleccionada(null);
      setRespuestaFinalizada(false);
      setFeedback("");
    } else {
      onFinish(aciertos, fallos);
    }
  };

  const handleSalirDelNivel = () => {
    Alert.alert(
      "¿Salir del nivel?",
      "Si sales ahora perderás tu progreso actual.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Salir",
          style: "destructive",
          onPress: () => router.replace("/home"),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Icono de salida */}
      <Pressable onPress={handleSalirDelNivel} style={styles.salirIcon}>
        <Ionicons name="arrow-back" size={28} color="#fff" />
      </Pressable>

      {/* Barra de progreso */}
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBarFill, { width: `${progreso}%` }]} />
      </View>

      <Text style={[styles.enunciado, fonts().title]}>{preguntaActual.enunciado}</Text>

      <View style={styles.opcionesContainer}>
        {preguntaActual.opciones.map((opcion, i) => {
          const seleccion = seleccionada === opcion;
          return (
            <Pressable
              key={i}
              style={[
                styles.opcion,
                seleccion && styles.opcionSeleccionada,
                respuestaFinalizada &&
                  (opcion === preguntaActual.respuestaCorrecta
                    ? styles.opcionCorrecta
                    : opcion === seleccionada
                    ? styles.opcionIncorrecta
                    : {}),
              ]}
              onPress={() => {
                if (!respuestaFinalizada) setSeleccionada(opcion);
              }}
            >
              <Text style={styles.opcionTexto}>{opcion}</Text>
            </Pressable>
          );
        })}
      </View>

      {feedback !== "" && (
        <View style={styles.feedbackContainer}>
          <Ionicons
            name={
              seleccionada === preguntaActual.respuestaCorrecta
                ? "checkmark-circle"
                : "close-circle"
            }
            size={28}
            color={
              seleccionada === preguntaActual.respuestaCorrecta
                ? "#4CAF50"
                : "#F44336"
            }
          />
          <Text
            style={[
              styles.feedback,
              seleccionada === preguntaActual.respuestaCorrecta
                ? styles.correcto
                : styles.incorrecto,
            ]}
          >
            {feedback}
          </Text>
        </View>
      )}

      <Pressable
        style={[
          styles.boton,
          !seleccionada && !respuestaFinalizada && styles.botonDesactivado,
        ]}
        onPress={respuestaFinalizada ? siguientePregunta : comprobar}
        disabled={!seleccionada && !respuestaFinalizada}
      >
        <Text style={styles.botonTexto}>
          {respuestaFinalizada ? "Siguiente →" : "Comprobar"}
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    flex: 1,
    backgroundColor: "#1E1E2A",
    justifyContent: "space-between",
  },
  salirIcon: {
    position: "absolute",
    top: 30,
    left: 20,
    zIndex: 10,
  },
  enunciado: {
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    marginTop: 10,
  },
  progressBarContainer: {
    height: 10,
    backgroundColor: "#4a4949",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 10,
    marginTop: 5,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: "#8B5CF6",
  },
  opcionesContainer: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  opcion: {
    width: "48%",
    padding: 18,
    backgroundColor: "#2A2A3D",
    borderRadius: 12,
    marginBottom: 12,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#444",
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 5,
  },
  opcionSeleccionada: {
    borderColor: "#8B5CF6",
    backgroundColor: "#372F50",
  },
  opcionCorrecta: {
    backgroundColor: "#4CAF50",
    borderColor: "#2e7d32",
  },
  opcionIncorrecta: {
    backgroundColor: "#F44336",
    borderColor: "#c62828",
  },
  opcionTexto: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  feedbackContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginVertical: 10,
  },
  feedback: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginLeft: 8,
  },
  correcto: {
    color: "#4CAF50",
  },
  incorrecto: {
    color: "#F44336",
  },
  boton: {
    backgroundColor: "#8B5CF6",
    padding: 16,
    borderRadius: 10,
    marginBottom:30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.4,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 10,
  },
  botonTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  botonDesactivado: {
    backgroundColor: "#555",
  },
});
