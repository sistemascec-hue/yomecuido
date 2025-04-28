// components/SimuladorTelefono.jsx
import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import MyButton from "./Button";
import fonts from "../theme/fonts";
import { CheckIcon, CheckIconfail, BackIcon } from "./Icons";
import CustomAlert from "./CustomAlert";
import IconButton from "./IconButton";
const opcionesConfiguracion = [
  { id: 1, texto: "Bloqueo de pantalla con contraseña", correcta: "activar" },
  { id: 2, texto: "Permitir acceso irrestricto a todas las apps", correcta: "desactivar" },
  { id: 3, texto: "Configurar huella digital", correcta: "activar" },
  { id: 4, texto: "Desactivar rastreo de ubicación innecesario", correcta: "activar" },
  { id: 5, texto: "Permitir rastreo publicitario", correcta: "desactivar" },
  { id: 6, texto: "Usar PIN sencillo como 1234", correcta: "desactivar" },
];

export default function SimuladorTelefono({ onFinish }) {
  const [seleccionadas, setSeleccionadas] = useState({});

  const seleccionar = (id, accion) => {
    setSeleccionadas((prev) => ({ ...prev, [id]: accion }));
  };
  const [mostrarAlertaSalir, setMostrarAlertaSalir] = useState(false);

  const handleSalirDelNivel = () => {
    setMostrarAlertaSalir(true);
};

  const comprobarConfiguracion = () => {
    let aciertos = 0;
    let fallos = 0;

    opcionesConfiguracion.forEach((opcion) => {
      const eleccion = seleccionadas[opcion.id];
      if (eleccion === opcion.correcta) {
        aciertos++;
      } else if (eleccion) {
        fallos++;
      }
    });

    onFinish({ aciertos, fallos });
  };

  return (
    <View style={styles.container}>
      <Text style={[fonts().title, styles.title]}>
        📱 Configura tu teléfono de forma segura
      </Text>
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

            
      <ScrollView contentContainerStyle={styles.scroll}>
        {opcionesConfiguracion.map((opcion) => (
          <View key={opcion.id} style={styles.opcionContainer}>
            <Text style={styles.opcionTexto}>{opcion.texto}</Text>
            <View style={styles.botonesContainer}>
              <Pressable
                style={[
                  styles.boton,
                  seleccionadas[opcion.id] === "activar" && styles.botonActivo,
                ]}
                onPress={() => seleccionar(opcion.id, "activar")}
              >
                <Text style={styles.botonTexto}>Activar</Text>
              </Pressable>
              <Pressable
                style={[
                  styles.boton,
                  seleccionadas[opcion.id] === "desactivar" && styles.botonActivo,
                ]}
                onPress={() => seleccionar(opcion.id, "desactivar")}
              >
                <Text style={styles.botonTexto}>Desactivar</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </ScrollView>

      <MyButton text="Comprobar" onPress={comprobarConfiguracion} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: "#F3F4F6",
  },
  title: {
    textAlign: "center",
    marginBottom: 20,
  },
  scroll: {
    flexGrow: 1,
    justifyContent: "center",
  },
  opcionContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  salirIcon: {
    position: "absolute",
    top: 30,
    left: 10,
    zIndex: 10,
},
  opcionTexto: {
    fontSize: 16,
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  botonesContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  boton: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: "#8B5CF6",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  botonActivo: {
    backgroundColor: "#8B5CF6",
  },
  botonTexto: {
    fontSize: 14,
    color: "#333",
  },
});
