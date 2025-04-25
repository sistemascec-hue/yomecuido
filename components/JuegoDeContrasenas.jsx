import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, TextInput, Alert, ImageBackground, Pressable,Keyboard } from "react-native";
import MyButton from "./Button";
import fonts from "../theme/fonts";
import IconButton from "./IconButton";
import { EyeIcon, EyeOff, BackIcon } from "./Icons";
import { useRouter } from "expo-router";
import CustomAlert from "./CustomAlert";
export default function JuegoDeContrasenas({ onFinish, onCompletar }) {
    const [contrasenas, setContrasenas] = useState(["", "", "", ""]);
    const [mostrar, setMostrar] = useState([false, false, false, false]);
    const [tiempoRestante, setTiempoRestante] = useState(50);
    const [juegoTerminado, setJuegoTerminado] = useState(false);
    const timerRef = useRef(null);
    const [mostrarAlerta, setMostrarAlerta] = useState(false);
    const [aciertos, setAciertos] = useState(0);
    const router = useRouter();
    const [mostrarAlertaSalir, setMostrarAlertaSalir] = useState(false);
    useEffect(() => {
        timerRef.current = setInterval(() => {
            setTiempoRestante((prev) => {
                if (prev <= 1) {
                    clearInterval(timerRef.current);
                    finalizarJuego();
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timerRef.current);
    }, []);

    const actualizarContrasena = (index, texto) => {
        const nuevas = [...contrasenas];
        nuevas[index] = texto;
        setContrasenas(nuevas);
    };

    const toggleMostrar = (index) => {
        const nuevos = [...mostrar];
        nuevos[index] = !nuevos[index];
        setMostrar(nuevos);
    };
    const handleSalirDelNivel = () => {
        setMostrarAlertaSalir(true);
    };

    const esContrasenaValida = (texto) => {
        const tieneMayuscula = /[A-Z]/.test(texto);
        const tieneNumero = /\d/.test(texto);
        const tieneSimbolo = /[^A-Za-z0-9]/.test(texto);
        const noSecuencial = !/(012|123|234|345|456|567|678|789)/.test(texto);
        return texto.length >= 8 && tieneMayuscula && tieneNumero && tieneSimbolo && noSecuencial;
    };

    const finalizarJuego = () => {
        setJuegoTerminado(true);
        const total = contrasenas.filter((c) => esContrasenaValida(c)).length;
        setAciertos(total);
        setMostrarAlerta(true);
    };
    const continuarJuego = () => {
        setMostrarAlerta(false);
        if (aciertos === 4) {
            onCompletar?.(contrasenas[1]); // ✅ Pasar a verificar, con la contraseña 2
        } else {
            router.replace("/home");
        }
    };

    return (
        <Pressable style={styles.container} onPress={Keyboard.dismiss}>
        <ImageBackground
            source={require("../assets/images/backgrounds/background3.webp")}
            style={styles.container}
            resizeMode="cover"
        >
            <IconButton onPress={handleSalirDelNivel} style={styles.salirIcon}>
                <BackIcon color="white" />
            </IconButton>
            <CustomAlert
                visible={mostrarAlerta}
                onClose={() => setMostrarAlerta(false)}
                title="Juego terminado"
                message={`Generaste ${aciertos} contraseñas seguras`}
                success={aciertos === 4}
                primaryButtonText={aciertos === 4 ? "Siguiente" : "Salir"}
                onPrimaryPress={continuarJuego}
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
                onSecondaryPress={() => setMostrarAlertaSalir(false)}
            />



            <View style={styles.overlay}>
                <Text style={styles.tiempo}>⏱ Tiempo: {tiempoRestante}s</Text>

                {contrasenas.map((valor, i) => {
                    const esValida = esContrasenaValida(valor);

                    return (
                        <View
                            key={i}
                            style={[
                                styles.inputGroup,
                                valor.length > 0 && !esValida && styles.invalida,
                                valor.length > 0 && esValida && styles.valida,
                            ]}
                        >

                            <TextInput
                                value={valor}
                                onChangeText={(t) => actualizarContrasena(i, t)}
                                placeholder={`Contraseña ${i + 1}`}
                                style={styles.input}
                                secureTextEntry={!mostrar[i]}
                                maxLength={20}
                            />
                            <Pressable onPress={() => toggleMostrar(i)} style={styles.icon}>
                                {mostrar[i]
                                    ? <EyeIcon color={esValida ? "#4CAF50" : "#F44336"} />
                                    : <EyeOff color={esValida ? "#4CAF50" : "#F44336"} />}
                            </Pressable>
                        </View>
                    );
                })}


                {!juegoTerminado && <MyButton text="Finalizar" onPress={finalizarJuego} />}
            </View>
        </ImageBackground>
        </Pressable>
    );
}

const styles = StyleSheet.create({
    container: {
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
    tiempo: {
        fontSize: 24,
        textAlign: "center",
        marginBottom: 20,
        color: "#fff",
    },
    inputContainer: {
        position: "relative",
        marginBottom: 15,
    },
    icon: {
        position: "absolute",
        right: 15,
        top: 12,
    },
    inputGroup: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#fff",
        borderRadius: 10,
        marginBottom: 15,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#ccc",
    },

    input: {
        flex: 1,
        padding: 12,
        fontSize: 16,

    },

    invalida: {
        borderColor: "#F44336",

    },

    valida: {
        borderColor: "#4CAF50",


    },


});
