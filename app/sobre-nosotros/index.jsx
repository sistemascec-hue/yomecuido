import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from "react-native";
import fonts from "../../theme/fonts";
import Navbar from "../../components/Navbar";
export default function NosotrosScreen() {
  const abrirEnlace = (url) => Linking.openURL(url);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ImageBackground
        source={require("../../assets/images/backgrounds/background3.webp")}
        style={styles.background}
        resizeMode="cover"
      >
        <Navbar />
        <ScrollView contentContainerStyle={styles.content}>
          <View style={styles.card}>
            <Text style={[styles.title, fonts().title]}>Sobre Nosotros</Text>
            <Image
              source={{
                uri: "https://tse3.mm.bing.net/th?id=OIP.kYIjSwRo0kgvtU9NwVDXlwAAAA&pid=Api",
              }}
              style={styles.image}
            />
            <Text style={[styles.paragraph, fonts().text]}>
              El Centro de Capacitación y Servicio para la Integración de la Mujer
              (CECASEM) somos una organización boliviana con más de veinticinco años de experiencia
              en desarrollo rural y más de diez años en la lucha contra la trata de personas.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={[styles.subtitle, fonts().subtitle]}>🎯 Misión</Text>
            <Text style={[styles.paragraph, fonts().text]}>
              Empoderar a cada niño y mujer boliviana para que tomen el control de su futuro mediante
              educación, autosuficiencia y tecnología.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={[styles.subtitle, fonts().subtitle]}>🌟 Visión</Text>
            <Text style={[styles.paragraph, fonts().text]}>
              Forjar una Bolivia inclusiva donde la igualdad de género sea una norma
              y todos conozcan sus derechos.
            </Text>
          </View>

          <View style={styles.card}>
            <Text style={[styles.subtitle, fonts().subtitle]}>💡 Era Digital</Text>
            <Text style={[styles.paragraph, fonts().text]}>
              CECASEM combina saberes ancestrales con tecnologías emergentes como TICs e IA
              para cerrar la brecha digital en comunidades rurales.
            </Text>
            <Image
              source={{
                uri: "https://tse4.mm.bing.net/th?id=OIP.ylHGvlI_Rm3G1sLfJSvfUQHaFj&pid=Api",
              }}
              style={styles.image}
            />
          </View>

          <View style={styles.card}>
            <Text style={[styles.subtitle, fonts().subtitle]}>📱 Redes Sociales</Text>
            <TouchableOpacity onPress={() => abrirEnlace("https://facebook.com/cecasem.bolivia")}>
              <Text style={styles.link}>🔗 Facebook: cecasem.bolivia</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => abrirEnlace("https://instagram.com/cecasem.bolivia")}>
              <Text style={styles.link}>🔗 Instagram: @cecasem.bolivia</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => abrirEnlace("https://youtube.com/@cecasem.bolivia")}>
              <Text style={styles.link}>🔗 YouTube: CECASEM Bolivia</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  card: {
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    color: "#FFF",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    color: "#FFD700",
    marginBottom: 6,
  },
  paragraph: {
    color: "#eee",
    lineHeight: 21,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: 180,
    borderRadius: 12,
    marginVertical: 10,
  },
  link: {
    color: "#8BC4FF",
    fontSize: 16,
    marginBottom: 6,
  },
});
