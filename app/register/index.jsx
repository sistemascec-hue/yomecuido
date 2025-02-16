import React, { useState } from "react";
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  ImageBackground,
  Image,
} from "react-native";
import { useRouter } from "expo-router";
import useAuth from "../../hooks/useAuth";
import colors from "../../theme/colors";
import fonts from "../../theme/fonts";
import globalStyles from "../../constants/globalStyles";
import InputField from "../../components/InputField";
import { UserIcon, LockIcon, EmailIcon } from "../../components/Icons";

export default function RegisterScreen() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();
  const { register, errors, authError, loading } = useAuth();

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
          <Text style={[fonts().title, styles.text]}>Registro</Text>

          {authError ? <Text style={styles.errorText}>{authError}</Text> : null}

          <InputField
            placeholder="Nombre de usuario"
            Icon={UserIcon}
            iconColor="#2E1C42"
            value={username}
            onChangeText={setUsername}
          />
          {errors.username && (
            <Text style={styles.errorText}>{errors.username}</Text>
          )}

          <InputField
            placeholder="Correo electrónico"
            Icon={EmailIcon}
            iconColor="#2E1C42"
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
          {errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          <InputField
            placeholder="Confirmar contraseña"
            Icon={LockIcon}
            iconColor="#2E1C42"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          {errors.confirmPassword && (
            <Text style={styles.errorText}>{errors.confirmPassword}</Text>
          )}
          <Pressable
            style={styles.button}
            onPress={() =>
              register(email, password, username, confirmPassword, () =>
                router.push("/login")
              )
            }
          >
            <Text style={styles.buttonText}>
              {loading ? "Registrando..." : "Registrarse"}
            </Text>
          </Pressable>
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
  containerInputs: {
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: colors.light.highlight,
    textAlign: "center",
    marginBottom: 10,
  },
  logo: {
    height: 350,
    width: 400,
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
    marginHorizontal: 0,
    fontSize: 12,
    paddingHorizontal: 40,
    paddingVertical: 7,
    borderRadius: 6,
  },
  InputField: {
    justifyContent: "center",
    alignItems: "center",
  },
});
