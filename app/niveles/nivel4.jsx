// views/niveles/NivelTips1.jsx
import React, { useState } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import MyButton from "../../components/Button";
import fonts from "../../theme/fonts";
import { CheckIcon, CheckIconfail, BackIcon } from "../../components/Icons";
import { useRouter } from "expo-router";
import SimuladorTelefono from "../../components/SimuladorTelefono";
import { db, auth } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import IconButton from "../../components/IconButton";
import CustomAlert from "../../components/CustomAlert";

export default function Nivel4() {
    const [fase, setFase] = useState("introduccion");
    const router = useRouter();
    const [resultados, setResultados] = useState({ aciertos: 0, fallos: 0 });
    const [mostrarAlertaSalir, setMostrarAlertaSalir] = useState(false);
    const [mostrarResultado, setMostrarResultado] = useState(false);
    const [resultadoExitoso, setResultadoExitoso] = useState(false);
    const [mensajeResultado, setMensajeResultado] = useState("");
    const handleSalirDelNivel = () => {
        setMostrarAlertaSalir(true);
    };
    const completarNivel = async () => {
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);

            await updateDoc(userRef, {
                "progress.mapa1.nivel4": "completado",
                "progress.mapa2.nivel1": "desbloqueado",
            });

            router.replace("/home"); // Redirige al home después de guardar
        } catch (error) {
            console.error("Error al actualizar progreso:", error);
        }
    };
    if (fase === "introduccion") {
        return (
            <ImageBackground
                source={require("../../assets/images/backgrounds/background3.webp")}
                style={styles.background}
                resizeMode="cover"
            >
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
                <View style={styles.overlay}>
                <IconButton onPress={handleSalirDelNivel} style={styles.salirIcon}>
                <BackIcon color="white" />
            </IconButton>
            
                    <Text style={[fonts().title, styles.title]}>
                        ¡Simulemos la Configuración de tu Teléfono! 📱
                    </Text>

                    <Text style={[fonts().text, styles.descripcion]}>
                        En este nivel aprenderás a proteger tu dispositivo simulando la configuración de seguridad.
                    </Text>

                    <View style={styles.listaReglas}>
                        <View style={styles.regla}>
                            <CheckIcon color="green" />
                            <Text style={[fonts().text, styles.reglaTexto]}>
                                Activa bloqueo de pantalla o PIN seguro
                            </Text>
                        </View>
                        <View style={styles.regla}>
                            <CheckIcon color="green" />
                            <Text style={[fonts().text, styles.reglaTexto]}>
                                Configura reconocimiento biométrico
                            </Text>
                        </View>
                        <View style={styles.regla}>
                            <CheckIcon color="green" />
                            <Text style={[fonts().text, styles.reglaTexto]}>
                                Controla permisos de aplicaciones
                            </Text>
                        </View>
                        <View style={styles.regla}>
                            <CheckIcon color="green" />
                            <Text style={[fonts().text, styles.reglaTexto]}>
                                Desactiva el rastreo de ubicación innecesario
                            </Text>
                        </View>
                    </View>

                    <MyButton text="¡Empezar!" onPress={() => setFase("simulador")} />
                </View>
            </ImageBackground>
        );
    }

    if (fase === "simulador") {

        return (
            <SimuladorTelefono
  onFinish={(resultado) => {
    setResultados(resultado);
    setFase("final");
  }}
/>
        );
    }
    if (fase === "final") {
        const total = resultados.aciertos + resultados.fallos;
        const paso = total > 0 && resultados.aciertos / total >= 0.5; // Verifica que no sea 0

        return (
            <ImageBackground
                source={require("../../assets/images/backgrounds/background3.webp")}
                style={styles.finalContainer}
                resizeMode="cover"
            >
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
                <View style={styles.overlay}>
                
                    <Text style={styles.finalTitle}>¡Configuración Completada!</Text>
                    <Text style={styles.finalSubtitle}>
                        Has mejorado la seguridad de tu dispositivo 🔒
                    </Text>

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
                            text="Finalizar Nivel"
                            onPress={completarNivel}
                        />
                    ) : (
                        <>
                            <MyButton
                                text="Volver a Intentar"
                                onPress={() => setFase("simulador")}
                                customStyles={{ backgroundColor: "#f7931e" }}
                            />
                            <MyButton
                                text="Salir al Inicio"
                                onPress={() => router.replace("/home")}
                                customStyles={{ backgroundColor: "#666", marginTop: 10 }}
                            />
                        </>
                    )}
                </View>
            </ImageBackground>
        );
    }

    return null;
}

const styles = StyleSheet.create({
    background: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "rgba(0,0,0,0.5)",
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
        fontSize: 18,
        color: "#333",
        marginLeft: 8,
    },
    finalContainer: {
        flex: 1,
    },
    finalTitle: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "#4B0076",
        textAlign: "center",
    },
    finalSubtitle: {
        fontSize: 18,
        color: "#ffff",
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
    salirIcon: {
        position: "absolute",
        top: 30,
        left: 10,
        zIndex: 10,
    },
});
