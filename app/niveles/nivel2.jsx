// views/niveles/NivelJuego1.jsx
import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground, TextInput, Alert, Keyboard, Pressable } from "react-native";
import { useRouter } from "expo-router";
import MyButton from "../../components/Button";
import fonts from "../../theme/fonts";
import IconButton from "../../components/IconButton";
import { CheckIcon, BackIcon } from "../../components/Icons";
import CustomAlert from "../../components/CustomAlert";
import JuegoDeContrasenas from "../../components/JuegoDeContrasenas";
import { db, auth } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
export default function Nivel2() {
  const [fase, setFase] = useState("introduccion"); // fases: introduccion → juego → final
  const router = useRouter();
  const [respuesta, setRespuesta] = useState(""); // lo que el usuario escribe
  const [intentoRealizado, setIntentoRealizado] = useState(false);
  const [contrasena2, setContrasena2] = useState(""); // para validar
  const [claveMemoria, setClaveMemoria] = useState("");

  const [mostrarResultado, setMostrarResultado] = useState(false);
  const [resultadoExitoso, setResultadoExitoso] = useState(false);
  const [mensajeResultado, setMensajeResultado] = useState("");
  const [mostrarAlertaSalir, setMostrarAlertaSalir] = useState(false);





  const handleVerificar = () => {
    setIntentoRealizado(true);

    if (respuesta === claveMemoria) {
      setResultadoExitoso(true);
      setMensajeResultado("¡Recordaste la contraseña!");
    } else {
      setResultadoExitoso(false);
      setMensajeResultado("Esa no era la contraseña que escribiste.");
    }

    setMostrarResultado(true);
  };


  const handleSalirDelNivel = () => {
    setMostrarAlertaSalir(true);
  };
  const [contrasenaSeleccionada, setContrasenaSeleccionada] = useState("");
  if (fase === "introduccion") {
    return (
      <ImageBackground
        source={require("../../assets/images/backgrounds/background3.webp")}
        style={styles.background}
        resizeMode="cover"
      >
        <IconButton onPress={handleSalirDelNivel} style={styles.salirIcon}>
          <BackIcon color="white" />
        </IconButton>
        <View style={styles.overlay}>

          <CustomAlert
            visible={mostrarAlertaSalir}
            onClose={() => setMostrarAlertaSalir(false)}
            title="¿Salir del nivel?"
            message="Si sales ahora perderás tu progreso actual."
            success={false}
            primaryButtonText="Salir"
            onPrimaryPress={() => {
              setMostrarAlertaSalir(false);
              router.replace("/home");
            }}
            secondaryButtonText="Cancelar"
          />
          <Text style={[fonts().title, styles.title]}>¡Juguemos!</Text>

          <Text style={[fonts().text, styles.descripcion]}>
            En este nivel deberás generar cuatro contraseñas seguras en menos de cincuenta segundos.
            Cada contraseña debe cumplir con las siguientes reglas:
          </Text>

          <View style={styles.listaReglas}>
            <View style={styles.regla}>
              <CheckIcon color="green" />
              <Text style={[fonts().text, styles.reglaTexto]}>Al menos una letra mayúscula</Text>
            </View>
            <View style={styles.regla}>
              <CheckIcon color="green" />
              <Text style={[fonts().text, styles.reglaTexto]}>Al menos un número</Text>
            </View>
            <View style={styles.regla}>
              <CheckIcon color="green" />
              <Text style={[fonts().text, styles.reglaTexto]}>Al menos un símbolo</Text>
            </View>
            <View style={styles.regla}>
              <CheckIcon color="green" />
              <Text style={[fonts().text, styles.reglaTexto]}>No usar secuencias númericas
              </Text>
            </View>
            <View style={styles.regla}>
              <CheckIcon color="green" />
              <Text style={[fonts().text, styles.reglaTexto]}>Mínimo ocho caracteres</Text>
            </View>
          </View>

          <MyButton text="¡Jugar!" onPress={() => setFase("juego")} />
        </View>
      </ImageBackground>
    );
  }

  if (fase === "juego") {
    return (
      <JuegoDeContrasenas
        onCompletar={(clave2) => {
          setClaveMemoria(clave2);
          setFase("pregunta");
        }}
      />
    );
  }

  if (fase === "pregunta") {
    return (
      <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <ImageBackground
          source={require("../../assets/images/backgrounds/background3.webp")}
          style={styles.background}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <CustomAlert
              visible={mostrarResultado}
              onClose={() => setMostrarResultado(false)}
              title={resultadoExitoso ? "Correcto" : "Incorrecto"}
              message={mensajeResultado}
              success={resultadoExitoso}
              primaryButtonText={resultadoExitoso ? "Ir al Home" : "Intentar de nuevo"}
              onPrimaryPress={async () => {
                setMostrarResultado(false);

                if (resultadoExitoso) {
                  try {
                    const userRef = doc(db, "users", auth.currentUser.uid);
                    await updateDoc(userRef, {
                      "progress.mapa1.nivel2": "completado",
                      "progress.mapa1.nivel3": "desbloqueado",
                    });

                    router.replace("/home");
                  } catch (error) {
                    console.error("Error al actualizar progreso:", error);
                  }
                } else {
                  setRespuesta(""); // Limpia para reintentar
                }
              }}
            />


            <CustomAlert
              visible={mostrarAlertaSalir}
              onClose={() => setMostrarAlertaSalir(false)}
              title="¿Salir del nivel?"
              message="Si sales ahora perderás tu progreso actual."
              success={false}
              primaryButtonText="Salir"
              onPrimaryPress={() => {
                setMostrarAlertaSalir(false);
                router.replace("/home");
              }}
              secondaryButtonText="Cancelar"
            />

            <Text style={[fonts().subtitle, styles.pregunta]}>
              ¿Cuál era la contraseña número dos que escribiste?
            </Text>
            <TextInput
              value={respuesta}
              onChangeText={setRespuesta}
              placeholder="Escribe la contraseña 2"
              style={styles.input}
              secureTextEntry
              maxLength={20}
            />
            <MyButton text="Verificar" onPress={() => {
              Keyboard.dismiss();
              handleVerificar();
            }} />
            <MyButton text="Reintentar" onPress={() => setFase("introduccion")} />

            {/* {intentoRealizado && (
          <MyButton
            text="Finalizar Nivel"
            href="/home"
          />
        )} */}
          </View>
        </ImageBackground>
      </Pressable>
    );
  }

  return null;
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  salirIcon: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 10,
  },
  overlay: {
    flex: 1,
    justifyContent: "center",
    padding: 24,
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  container: {
    flex: 1,
    // padding: 30,
    // justifyContent: "center",
    // backgroundColor: "#f5f5f5",
  },
  pregunta: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: "center",
    color: "#dbd5d5",
  },
  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 10,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 20,
  },
  title: {

    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  descripcion: {
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  listaReglas: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 10,
    marginBottom: 30,
  },
  regla: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  reglaTexto: {
    fontSize: 20,
    color: "#333",
    marginLeft: 8,
  },
  juegoContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
});
