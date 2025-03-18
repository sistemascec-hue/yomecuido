import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
  Keyboard,
  Alert
} from "react-native";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import globalStyles from "../../constants/globalStyles";
import InputField from "../../components/InputField";
import { EmailIcon, LockIcon } from "../../components/Icons";
import Button from "../../components/Button";
import { auth } from "../../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import ResendEmailButton from "../../components/ResendEmailButton"

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const router = useRouter();
  const {
    login,
    errors,
    authError,
    loading,
    resendVerificationEmail,
    secondsLeft,
    isDisabled
  } = useAuth();




  useEffect(() => {
    const checkSuccessMessage = async () => {
      const message = await AsyncStorage.getItem("registrationSuccess");
      if (message) {
        setSuccessMessage(message);
        await AsyncStorage.removeItem("registrationSuccess");
      }
    };
    checkSuccessMessage();
  }, []);
  
  return (
    <ImageBackground
      source={require("../../assets/images/backgrounds/background2.webp")}
      style={styles.background}
      resizeMode="cover"
    >
      <Pressable onPress={Keyboard.dismiss}>
        <View>
          {successMessage ? (
            <Text style={styles.successText}>{successMessage}</Text>
          ) : null}
        </View>
        <View style={globalStyles.container}>
          <View style={styles.InputField}>


            <Image
              source={require("../../assets/images/logos/logo1.webp")}
              style={styles.logo}
            />
            <Text style={[fonts().title, styles.text]}>Inicio de Sesión</Text>

            {authError ? <Text style={styles.errorText}>{authError}</Text> : null}

            <InputField
              placeholder="Correo electrónico"
              Icon={EmailIcon}
              IconColor="#2E1C42"
              value={email}
              onChangeText={setEmail}
            />
            {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}


            <InputField
              placeholder="Contraseña"
              Icon={LockIcon}
              iconColor="#2E1C42"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
             {/* Mostrar el temporizador antes de que el usuario haga clic en "Reenviar" */}
          {authError === "Debes verificar tu correo antes de iniciar sesión." && (
            <>
              <Text style={styles.timerText}>
                {isDisabled ? `Volver a reenviar en ${secondsLeft}s` : "Reenviar correo de verificación"}
              </Text>
              <Pressable
                style={[styles.resendButton, isDisabled && styles.disabledButton]}
                onPress={() => resendVerificationEmail(email, password)}
                disabled={isDisabled}
              >
                <Text style={styles.resendText}>Reenviar correo</Text>
              </Pressable>
            </>
          )}


            <Pressable style={styles.button} onPress={() => { Keyboard.dismiss(); login(email, password, () => router.push("/home")) }}>
              <Text style={styles.buttonText}>{loading ? "Cargando..." : "Iniciar Sesión"}</Text>
            </Pressable>

            <Button text="Crear Usuario" href="/register" />
          </View>
        </View>
      </Pressable>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  timerText: {
    marginTop: 10,
    fontSize: 14,
    color: "#007AFF",
    fontWeight: "bold",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  InputField: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 300,
    width: 400,

  },
  text: {
    color: colors.light.highlight,
    textAlign: "center",
    marginBottom: 10,
  },
  button: {
    backgroundColor: colors.light.buttonBackground,
    paddingVertical: 13,
    paddingHorizontal: 40,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    shadowColor: "#000",
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "white",
    fontFamily: "sugo-trial",
    fontSize: 20,
  },
  errorText: {
    fontFamily: "roboto-bold",
    backgroundColor: "red",
    color: "white",
    marginTop: 5,
    fontSize: 12,
    paddingHorizontal: 40,
    paddingVertical: 7,
    borderRadius: 6,
  },
  errorContainer: {
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 6,
    marginBottom: 10,
    width: '80%',
  },
  InputField: {
    justifyContent: "center",
    alignItems: "center"
  },
  successText: {
    fontFamily: "sugo-trial",
    fontSize: 20,
    color: "#13ea01",
    textAlign: "center"

  },
  resendButton: {
    marginTop: 5,
    backgroundColor: colors.light.buttonBackground,
    paddingVertical: 15,
    paddingHorizontal: 26,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#007AFF",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  disabledButton: {
    backgroundColor: "#ccc",
    borderColor: "#999",
  },
  resendText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

});

