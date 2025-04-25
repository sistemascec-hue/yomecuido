// components/CuentoInteractivo.jsx
import React, { useState } from "react";
import { View, Text, ImageBackground, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import fonts from "../theme/fonts";
import MyButton from "./Button";
export default function CuentoInteractivo({ historia, onFinish }) {
    const [indice, setIndice] = useState(0);
    const escena = historia[indice];

    const avanzar = () => {
        if (indice < historia.length - 1) {
            setIndice(indice + 1);
        } else {
            onFinish(); // cuando termina la historia
        }
    };

    return (
        <ImageBackground source={escena.imagen} style={styles.fondo}>
            <View style={styles.overlay}>
                <View style={styles.textContainer}>
                    <Text style={[styles.texto, fonts().body]}>{escena.texto}</Text>
                </View>

                <MyButton
                    text={
                        indice === historia.length - 1
                            ? "Comenzar preguntas"
                            : "Siguiente →"
                    }
                    onPress={avanzar}
                    variant="cuento"
                />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    fondo: {
        flex: 1,
        resizeMode: "cover",
        justifyContent: "flex-end",
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        padding: 20,
    },
    textContainer: {
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
    },
    texto: {
        fontSize: 18,
        color: "#333",
        textAlign: "center",
    },
    boton: {
        backgroundColor: "#6B21A8",
        padding: 12,
        borderRadius: 8,
        alignItems: "center",
    },
    botonTexto: {
        color: "#fff",
        fontSize: 16,
        fontWeight: "bold",
    },
});
