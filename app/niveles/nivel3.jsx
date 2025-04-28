import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet, ImageBackground } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import MyButton from "../../components/Button";
import PreguntasInteractivas from "../../components/PreguntasInteractivas";
import dataNivelVideo from "../../data/dataNivelVideo"; // este archivo contiene las preguntas
import fonts from "../../theme/fonts";
import colors from "../../theme/colors";
import { useRouter } from "expo-router";
import IconButton from "../../components/IconButton";
import { doc, updateDoc } from "firebase/firestore";
import {db, auth} from "../../firebase";  
import { BackIcon, CheckIcon, CheckIconfail } from "../../components/Icons";
import CustomAlert from "../../components/CustomAlert";
export default function Nivel3() {
    const [fase, setFase] = useState("video"); // "video" → "preguntas" → "final"
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const router = useRouter();
    const [resultados, setResultados] = useState({ aciertos: 0, fallos: 0 });
    const [mostrarAlertaSalir, setMostrarAlertaSalir] = useState(false);
    const total = resultados.aciertos + resultados.fallos;
    const paso = resultados.aciertos / total >= 0.5;
    const completarNivel = async () => {
        try {
            const userRef = doc(db, "users", auth.currentUser.uid);

            await updateDoc(userRef, {
                "progress.mapa1.nivel3": "completado",
                "progress.mapa1.nivel4": "desbloqueado",
            });

            router.replace("/home"); // Redirige al home después de guardar
        } catch (error) {
            console.error("Error al actualizar progreso:", error);
        }
    };
    const handleSalirDelNivel = () => {
        setMostrarAlertaSalir(true);
    };
    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setIsPlaying(false);
            setVideoEnded(true);
        }
    }, []);

    if (fase === "preguntas") {
        return (
            <PreguntasInteractivas
                preguntas={dataNivelVideo.preguntas}
                retroalimentacion={dataNivelVideo.retroalimentacion}
                onFinish={(aciertos, fallos) => {
                    setResultados({ aciertos, fallos });
                    setFase("final");
                }}
            />
        );
    }

    if (fase === "final") {
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
                                onPress={() => setFase("preguntas")} // 👈 regresaría a repetir las preguntas
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

    return (
        <ImageBackground
            source={require("../../assets/images/backgrounds/background2.webp")}
            style={styles.background}
            resizeMode="cover"
        >
            <IconButton onPress={handleSalirDelNivel} style={styles.salirIcon}>
                <BackIcon color="black" />
            </IconButton>
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
            <Text style={[fonts().title, styles.titulo]}>
                🎥 Aprende sobre Contraseñas Seguras
            </Text>
            <Text style={styles.descripcion}>
                Observa el video y responde las preguntas al finalizar.
            </Text>

            <View style={styles.videoContainer}>
                <YoutubePlayer
                    height={199}
                    play={isPlaying}
                    videoId="I8AhGbzzego"
                    onChangeState={onStateChange}
                />
            </View>

            {videoEnded && (
                <MyButton text="Siguiente" onPress={() => setFase("preguntas")} />
            )}
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: {
        padding: 24,
        flex: 1,
        backgroundColor: "#f3f4f6",
        justifyContent: "center",
    },
    titulo: {
        color: colors.light.secondaryText,
        textAlign: "center",
        marginBottom: 10,
    },
    salirIcon: {
        position: "absolute",
        top: 30,
        left: 10,
        zIndex: 10,
    },
    descripcion: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    videoContainer: {
        borderWidth: 5,
        borderColor: colors.light.secondaryText,
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 30,
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
    overlay: {
        flex: 1,
        justifyContent: "center",
        padding: 24,
        backgroundColor: "rgba(0,0,0,0.5)",
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
});
