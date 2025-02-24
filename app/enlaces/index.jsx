import React from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  Text,
  StyleSheet,
  ImageBackground,
} from "react-native";
import TipCard from "../../components/TipCard";
import Navbar from "../../components/Navbar";
import fonts from "../../theme/fonts";
import colors from "../../theme/colors";
export default function EnlacesScreen() {
  return (
    <SafeAreaView style={styles.background}>
      <ImageBackground
        source={require("../../assets/images/backgrounds/background.webp")}
        style={styles.background}
      >
        <Navbar />
        <Text style={[styles.header, fonts().title]}>
          ¿Qué es un enlace malicioso?
        </Text>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <TipCard
            title="Enlace peligroso"
            image={require("../../assets/images/tips_enlaces/robotsconpantsos.webp")}
            description="Es un enlace que lleva a un sitio web que puede ser peligroso para el usuario o su dispositivo."
          />

          <Text style={[styles.subHeader, fonts().title]}>
            Tips para protegerte
          </Text>
          <View>
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
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
  },
  scrollContainer: {
    padding: 20,
  },
  header: {
    color: colors.light.text,
    textAlign: "center",
    marginBottom: 5,
  },
  subHeader: {
    color: colors.light.text,
    textAlign: "center",
    marginTop: 15,
    marginBottom: 10,
  },
});
