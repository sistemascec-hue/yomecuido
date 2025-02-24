import React from "react";
import { View, ScrollView, SafeAreaView, Text, StyleSheet, ImageBackground } from "react-native";
import TipCard from "../../components/TipCard";
import Navbar from "../../components/Navbar";
export default function EnlacesScreen() {
  return (
    <ImageBackground
    source={require("../../assets/images/backgrounds/background.webp")}
      style={styles.background}
    >
        <SafeAreaView>
        <Navbar />
        <View>
        <Text style={styles.header}>¿Qué es un enlace malicioso?</Text>
        </View>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
      
        
        <TipCard
          title="Enlace peligroso"
          image={require("../../assets/images/tips_enlaces/robotsconpantsos.webp")}
          description="Es un enlace que lleva a un sitio web que puede ser peligroso para el usuario o su dispositivo."
        />
        
        <Text style={styles.subHeader}>Tips para protegerte</Text>

        <TipCard
          title="El enlace empieza con 'https'"
          image={require("../../assets/images/tips_enlaces/imagen_https.webp")}
          description="HTTPS confirma que la página web es segura, pero no siempre significa que sea confiable."
        />

        <TipCard
          title="Revisa bien el nombre del enlace"
          image={require("../../assets/images/tips_enlaces/httpsohttp.webp")}
          description="Hay links que pueden tener alterado alguna letra que no se lee a simple vista"
        />

        <TipCard
          title="No confíes en enlaces acortados"
          image={require("../../assets/images/tips_enlaces/cortadorlinks.webp")}
          description="Evita hacer clic en bit.ly, tinyurl, cutt.ly, ya que pueden ocultar direcciones peligrosas,si ves estas palabras en algun enlace evitalas a menos que sea de confianza"
        />
        <TipCard
          title="Evita enlaces enviados por desconocidos"
          image={require("../../assets/images/tips_enlaces/enmascarado.webp")}
          description="Si recibes un link de alguien que no conoces, no lo abras"
        />
        <TipCard
          title="Si te piden datos personales, SOSPECHA"
          image={require("../../assets/images/tips_enlaces/formulario.webp")}
          description="Bancos y empresas reales nunca te pediran contraseñas por un enlace"
        />
      </ScrollView>
    </SafeAreaView>
    </ImageBackground>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#C1E1C1", // Color de fondo similar al de la imagen
  },
  background:{
    flex:1,
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
  },
});
