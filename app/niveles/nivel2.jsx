import React, { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Nivel2() {
  const router = useRouter();
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleSelect = (option) => {
    setSelectedAnswer(option);
  };

  const checkAnswer = () => {
    if (selectedAnswer === "opcionCorrecta") {
      alert("¡Correcto! Has aprendido sobre contraseñas seguras.");
      router.push("/home"); // Redirigir al home
    } else {
      alert("Incorrecto, intenta de nuevo.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🔐 Historia: Una contraseña segura</Text>
      <Text style={styles.story}>
        Pedro usaba la misma contraseña para todas sus cuentas: "pedro123".
        Un día, un hacker adivinó su contraseña y accedió a su correo.
        ¿Cómo podría haber evitado esto?
      </Text>

      {/* Opciones de respuesta */}
      <Pressable
        style={[
          styles.option,
          selectedAnswer === "incorrecta1" && styles.selected,
        ]}
        onPress={() => handleSelect("incorrecta1")}
      >
        <Text style={styles.optionText}>A) Usando "pedro2025"</Text>
      </Pressable>

      <Pressable
        style={[
          styles.option,
          selectedAnswer === "opcionCorrecta" && styles.selected,
        ]}
        onPress={() => handleSelect("opcionCorrecta")}
      >
        <Text style={styles.optionText}>B) Creando una contraseña con mayúsculas, números y símbolos</Text>
      </Pressable>

      <Pressable
        style={[
          styles.option,
          selectedAnswer === "incorrecta2" && styles.selected,
        ]}
        onPress={() => handleSelect("incorrecta2")}
      >
        <Text style={styles.optionText}>C) Escribiendo su contraseña en una libreta</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={checkAnswer}>
        <Text style={styles.buttonText}>Comprobar respuesta</Text>
      </Pressable>
    </View>
  );
}

// 🎨 Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  story: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  option: {
    backgroundColor: "#fff",
    padding: 10,
    marginVertical: 5,
    width: "80%",
    borderRadius: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#ccc",
  },
  selected: {
    backgroundColor: "#FFD700",
  },
  optionText: {
    fontSize: 16,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#0288D1",
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
});
