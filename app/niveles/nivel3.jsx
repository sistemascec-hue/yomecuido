import React, { useState, useCallback } from "react";
import { View, Text, StyleSheet } from "react-native";
import YoutubePlayer from "react-native-youtube-iframe";
import MyButton from "../../components/Button";
import PreguntasInteractivas from "../../components/PreguntasInteractivas";
import dataNivelVideo from "../../data/dataNivelVideo"; // este archivo contiene las preguntas
import fonts from "../../theme/fonts";
import { useRouter } from "expo-router";
export default function Nivel3() {
    const [fase, setFase] = useState("video"); // "video" → "preguntas" → "final"
    const [isPlaying, setIsPlaying] = useState(false);
    const [videoEnded, setVideoEnded] = useState(false);
    const router = useRouter();
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
                onFinish={() => setFase("final")}
            />
        );
    }

    if (fase === "final") {
        return (
            <View style={styles.finalContainer}>
                <Text style={styles.finalTitle}>🎉 ¡Nivel completado!</Text>
                <Text style={styles.finalSubtitle}>
                    ¡Excelente trabajo! Has aprendido sobre contraseñas seguras.
                </Text>
                <MyButton
                    text="Volver al inicio"
                    onPress={() => router.replace("/home")}
                />
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Text style={[fonts().title, styles.titulo]}>
                🎥 Aprende sobre Contraseñas
            </Text>
            <Text style={styles.descripcion}>
                Observa el video y responde las preguntas al finalizar.
            </Text>

            <View style={styles.videoContainer}>
                <YoutubePlayer
                    height={200}
                    play={isPlaying}
                    videoId="I8AhGbzzego"
                    onChangeState={onStateChange}
                />
            </View>

            {videoEnded && (
                <MyButton text="Siguiente" onPress={() => setFase("preguntas")} />
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 24,
        flex: 1,
        backgroundColor: "#f3f4f6",
        justifyContent: "center",
    },
    titulo: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#4B0076",
        textAlign: "center",
        marginBottom: 10,
    },
    descripcion: {
        fontSize: 16,
        color: "#333",
        textAlign: "center",
        marginBottom: 20,
    },
    videoContainer: {
        borderWidth: 3,
        borderColor: "#6B21A8",
        borderRadius: 16,
        overflow: "hidden",
        marginBottom: 30,
    },
    finalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        padding: 30,
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
        color: "#555",
        textAlign: "center",
        marginBottom: 30,
    },
});
