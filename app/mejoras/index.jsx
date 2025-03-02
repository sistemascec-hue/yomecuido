import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
  ScrollView
} from "react-native";
import Navbar from "../../components/Navbar";
import MejoraCard from "../../components/MejoraCard"; // Importamos el nuevo componente

const TIPS_DATA = [
  {
    id: 1,
    title: "Protege tus Contraseñas",
    image: require("../../assets/images/mejoras/candado.webp"),
    details: [
      "✅ Usa contraseñas seguras y difíciles de adivinar.",
      '✅ No uses tu nombre, fecha de nacimiento o "123456".',
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
];

export default function BuenasPracticasScreen() {
  return (
    <SafeAreaView style={styles.safearea}>
      <ImageBackground
        source={require("../../assets/images/backgrounds/background.webp")}
        style={styles.imbackground}
      >
        <Navbar />
        <ScrollView>
          <View style={styles.container}>
            <Text>Buenas Prácticas</Text>
            <Text>Aprende a proteger tu información de manera más segura!</Text>
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
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
  },
});
