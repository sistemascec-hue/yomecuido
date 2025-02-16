import { useState } from "react";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function useAuth() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Función para validar campos
  const validateInputs = ({ email, password, username, confirmPassword }) => {
    let newErrors = {};

    if (username !== undefined) {
      if (!username || username.length < 3) {
        newErrors.username =
          "El nombre de usuario debe tener al menos 3 caracteres.";
      }
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Correo electrónico inválido.";
    }

    if (!password || password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }

    if (confirmPassword !== undefined && password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Función para iniciar sesión
  const login = async (email, password, onSuccess) => {
    if (!validateInputs({ email, password })) return;

    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (error) {
      setAuthError("Credenciales incorrectas");
      switch (error.code) {
        case "auth/user-not-found":
          setAuthError("Usuario no encontrado");
          break;
        case "auth/wrong-password":
          setAuthError("Contraseña incorrecta");
          break;
        case "auth/invalid-email":
          setAuthError("Correo electrónico inválido");
          break;
        case "auth/user-disabled":
          setAuthError("Usuario deshabilitado");
          break;
        case "auth/too-many-requests":
          setAuthError("Demasiados intentos fallidos. Intente más tarde");
          break;
        default:
          setAuthError("Error desconocido. Intente nuevamente.");
      }
    }
    setLoading(false);
  };

  // Función para registrar usuario
  //   const register = async (email, password, username, confirmPassword, onSuccess) => {
  //     if (!validateInputs({ email, password, username, confirmPassword }))
  //         return;

  //     setLoading(true);
  //     try {
  //       await createUserWithEmailAndPassword(auth, email, password);
  //       onSuccess();
  //     } catch (error) {
  //       setAuthError(error.message);
  //     }
  //     setLoading(false);
  //   };

  //   return { login, register, errors, authError, loading };

  const register = async (
    email,
    password,
    username,
    confirmPassword,
    onSuccess
  ) => {
    if (!validateInputs({ email, password, username, confirmPassword })) return;
    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      await AsyncStorage.setItem(
        "registrationSuccess",
        "Registro exitoso. Por favor, inicia sesión"
      );
      onSuccess();
    } catch (error) {
      setAuthError(error.message);
    }
    setLoading(false);
  };
  return { login, register, errors, authError, loading };
}
