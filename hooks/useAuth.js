import { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  fetchSignInMethodsForEmail
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { Alert } from "react-native";

export default function useAuth() {
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [authError, setAuthError] = useState("");

  // Función para validar campos
  const validateLoginInputs = ({ email, password }) => {
    let newErrors = {};

    if (!email) {
      newErrors.email = "Ingrese su correo electrónico.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Correo electrónico inválido.";
    }

    if (!password) {
      newErrors.password = "Ingrese su contraseña.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // funcion de validacion de inputs para mejorar el manejo de errores.
  const validateInputs = ({ email, password, username, confirmPassword }) => {
    let newErrors = {};

    // Convertir el nombre de usuario a minúsculas y eliminar espacios en los extremos
    if (username) {
      username = username.trim().toLowerCase();
    }

    // Validar nombre de usuario (mínimo 5 caracteres y sin espacios)
    if (!username || username.length < 5) {
      newErrors.username =
        "El nombre de usuario debe tener al menos 5 caracteres.";
    } else if (/\s/.test(username)) {
      newErrors.username = "El nombre de usuario no debe contener espacios.";
    } else if (username.length > 20) {
      newErrors.username =
        "El nombre de usuario no debe pasar los 20 caracteres";
    }

    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      newErrors.email = "Correo electrónico inválido.";
    }

    // Validar contraseña (mínimo 6 caracteres, al menos una mayúscula y letras)
    if (!password || password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (confirmPassword !== undefined && password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }
    // ---- Manejo mas robusto de errores para contraseñas ----

    // else if (!/[A-Z]/.test(password)) {
    //   newErrors.password =
    //     "La contraseña debe contener al menos una letra mayúscula.";
    // } else if (!/[0-9]/.test(password)) {
    //   newErrors.password = "La contraseña debe contener al menos un número.";
    // }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const login = async (email, password, onSuccess) => {
    setErrors({});
    setAuthError("");

    if (!validateLoginInputs({ email, password })) return;

    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Bloquear acceso si el correo no está verificado
      if (!user.emailVerified) {
        await auth.signOut(); // Cerrar sesión para evitar que acceda sin verificar
        setAuthError("Debes verificar tu correo antes de iniciar sesión.");
        setLoading(false);
        return;
      }

      onSuccess(); // ✅ Si está verificado, permitir acceso
    } catch (error) {
      console.log("Código de error:", error.code);
      console.log("Mensaje de error:", error.message);

      switch (error.code) {
        case "auth/user-not-found":
        case "auth/wrong-password":
        case "auth/invalid-credential":
          setAuthError("Correo o contraseña incorrectos.");
          break;
        // otros casos...
        default:
          setAuthError("Ocurrió un error inesperado. Intente nuevamente.");
      }
    }
    setLoading(false);
  };

  // creando con firestore y firebase authentication
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
      // Crear usuario en Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Enviar verificación de correo
      await sendEmailVerification(user);
      Alert.alert(
        "Verificación de correo enviada",
        "Revisa tu bandeja de entrada y confirma tu cuenta antes de iniciar sesión.",
        [{ text: "Entendido" }]
      );
      // Guardar usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        createdAt: serverTimestamp(),
      });

      // Guardar mensaje de éxito en AsyncStorage
      await AsyncStorage.setItem(
        "registrationSuccess",
        "Registro exitoso. Por favor, verifica tu correo antes de iniciar sesión."
      );

      onSuccess(); // Redirigir al login tras el registro exitoso
    } catch (error) {
      // console.log("Código de error:", error.code);
      // console.log("Mensaje de error:", error.message);

      switch (error.code) {
        case "auth/email-already-in-use":
          setAuthError("El correo que ingresaste ya esta en uso.");
          break;
        // otros casos...
        default:
          setAuthError("Ocurrió un error inesperado. Intente nuevamente.");
      }
    }
    setLoading(false);
  };
  const resendVerificationEmail = async (email, password) => {
    try {
      // Forzar inicio de sesión para que Firebase reconozca al usuario
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      if (!user.emailVerified) {
        await sendEmailVerification(user);
        Alert.alert("Correo reenviado", "Revisa tu bandeja de entrada.");
      } else {
        Alert.alert("Tu cuenta ya está verificada.");
      }
    } catch (error) {
      console.error("Error al reenviar verificación:", error.message);
      Alert.alert("Error", "No se pudo reenviar el correo.");
    }
  };
  
  
  

  return {
    login,
    register,
    errors,
    authError,
    loading,
    resendVerificationEmail,
  };
}
