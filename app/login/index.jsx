import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ImageBackground,
  Pressable,
} from "react-native";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import globalStyles from "../../constants/globalStyles";
import InputField from "../../components/InputField";
import { EmailIcon, LockIcon } from "../../components/Icons";
import Button from "../../components/Button";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { login, errors, authError, loading } = useAuth();

  return (
    <ImageBackground
      source={require("../../assets/images/backgrounds/background2.webp")}
      style={styles.background}
      resizeMode="cover"
    >
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

        <Pressable style={styles.button} onPress={() => login(email, password, () => router.push("/home"))}>
          <Text style={styles.buttonText}>{loading ? "Cargando..." : "Iniciar Sesión"}</Text>
        </Pressable>

        <Button text="Crear Usuario" href="/register" />
        </View>
      </View>
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  InputField: {
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    height: 350,
    width: 400,
    marginBottom: 10,
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
  InputField:{
    justifyContent: "center",
    alignItems: "center"
  }

}); 

