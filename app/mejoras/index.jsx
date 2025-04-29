import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  ScrollView,
} from "react-native";
import Navbar from "../../components/Navbar";
import MejoraCard from "../../components/MejoraCard"; 
import fonts from "../../theme/fonts";
import colors from "../../theme/colors";

const TIPS_DATA = [
  {
    id: 1,
    title: "Protege tus Contraseñas",
    image: require("../../assets/images/mejoras/candado.webp"),
    details: [
      "✅ Usa contraseñas seguras y difíciles de adivinar.",
      "✅ No uses tu nombre, fecha de nacimiento o '123456'.",
      "✅ Activa la autenticación en dos pasos en tus cuentas importantes.",
      "✅ No compartas tus contraseñas con nadie.",
    ],
  },
  {
    id: 2,
    title: "Protege tu Celular y Computadora",
    image: require("../../assets/images/mejoras/compu_y_celu.webp"),
    details: [
      "✅ No instales aplicaciones de fuentes desconocidas.",
      "✅ Mantén actualizado tu sistema operativo y antivirus.",
      "✅ No prestes tu celular a extraños sin supervisión.",
      "✅ Evita conectar USB desconocidos en tu computadora.",
    ],
  },
  {
    id: 3,
    title: "Cuidado con lo que publicas en redes",
    image: require("../../assets/images/mejoras/posting.webp"),
    details: [
      "❌ No publiques tu dirección exacta ni la de tu colegio.",
      "❌ Evita mostrar placas de autos o fotos donde se vean rutas frecuentes.",
      "⚠️ Un secuestrador puede recolectar tus datos solo con mirar tus redes.",
      "✅ Revisa la privacidad de tus publicaciones antes de compartir.",
    ],
  },
  {
    id: 4,
    title: "Nunca respondas a desconocidos",
    image: require("../../assets/images/mejoras/letterquestion.webp"), 
    details: [
      "⚠️ No respondas mensajes sospechosos o de números desconocidos.",
      "❌ No compartas fotos, datos personales ni ubicación.",
      "👤 Algunos perfiles falsos buscan estafar o extorsionar.",
      "✅ Si tienes dudas, pide ayuda a un adulto de confianza.",
    ],
  }
  

  
];

export default function BuenasPracticasScreen() {
  return (
    <SafeAreaView style={styles.safearea}>
      <ImageBackground
        source={require("../../assets/images/backgrounds/background3.webp")}
        style={styles.imbackground}
        resizeMode="cover"
      >
        <Navbar />

        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={[styles.header, fonts().title]}>
            Buenas Prácticas de Seguridad
          </Text>
          <Text style={[styles.subheader, fonts().subtitle]}>
            Aprende a proteger tu información personal de manera efectiva
          </Text>

          <View style={styles.cardsContainer}>
            {TIPS_DATA.map((tip) => (
              <MejoraCard key={tip.id} tip={tip} />
            ))}
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safearea: {
    flex: 1,
  },
  imbackground: {
    flex: 1,
  },
  scrollContainer: {
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  header: {
    color: colors.light.text,
    textAlign: "center",
    marginBottom: 10,
    fontSize: 30,
  },
  subheader: {
    color: colors.light.text,
    textAlign: "center",
    marginBottom: 20,
    fontSize: 20,
  },
  cardsContainer: {
    gap: 20, // separación entre cards
    paddingBottom: 50,
  },
});
