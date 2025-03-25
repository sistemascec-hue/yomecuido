import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
  Alert,
  ImageBackground,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
  TouchableWithoutFeedback,
} from "react-native";
import { useState } from "react";
import { Link } from "expo-router";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";
import { useRouter } from "expo-router";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";

export default function ResetPasswordScreen() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handlePasswordReset = async () => {
    if (!email) {
      Alert.alert("Error", "Por favor, ingresa tu correo electrónico.");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      Alert.alert(
        "Correo enviado",
        "Revisa tu bandeja de entrada para restablecer tu contraseña."
      );
      router.replace("/login");
    } catch (error) {
      console.error("Error al enviar el correo:", error.message);
      Alert.alert("Error", "No se pudo enviar el correo. Verifica que sea válido.");
    }
  };

  return (
    <ImageBackground
      source={require("../../assets/images/backgrounds/background2.webp")}
      style={styles.background}
      resizeMode="cover"
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <KeyboardAvoidingView
          style={styles.container}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <View style={styles.innerContainer}>
            <Text style={[fonts().title, styles.title]}>Restablecer Contraseña</Text>

            <TextInput
              style={styles.input}
              placeholder="Ingresa tu correo"
              placeholderTextColor="#999"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
            />

            <Pressable onPress={handlePasswordReset}
            style={({ pressed }) => [
              styles.button,
              pressed && styles.backButtonPressed,
            ]}
            >
              <Text style={styles.buttonText}>Enviar Correo</Text>
            </Pressable>
            <View>
              <Pressable
                onPress={() => router.replace("/login")}
                style={({ pressed }) => [
                  styles.backButton,
                  pressed && styles.backButtonPressed,
                ]}
              >
                <Text style={styles.backButtonText}>Volver al inicio de sesión</Text>
              </Pressable>
            </View>

          </View>
        </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  backButton: {
    marginTop: 20,
    backgroundColor: "transparent",
    alignItems: "center",
    justifyContent: "center",

  },

  backButtonPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.97 }],
  },

  backButtonText: {
    color: colors.light.highlight,
    fontSize: 18,
    fontFamily: "sugo-trial",
    textAlign: "center",
  },
  innerContainer: {
    backgroundColor: "rgba(116, 116, 116, 0.92)",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    color: colors.light.buttonBackground,
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  button: {
    backgroundColor: colors.light.buttonBackground,
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    marginVertical: 10,
  },
  buttonText: {
    color: "white",
    fontFamily: "sugo-trial",
    fontSize: 18,
  },
});
