import { useState } from "react";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
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
    // ---- Manejo mas robusto de errores para contraseñas ----

    // else if (!/[A-Z]/.test(password)) {
    //   newErrors.password =
    //     "La contraseña debe contener al menos una letra mayúscula.";
    // } else if (!/[0-9]/.test(password)) {
    //   newErrors.password = "La contraseña debe contener al menos un número.";
    // }
    // if (confirmPassword !== undefined && password !== confirmPassword) {
    //   newErrors.confirmPassword = "Las contraseñas no coinciden.";
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
      await signInWithEmailAndPassword(auth, email, password);
      onSuccess();
    } catch (error) {
      console.log("Código de error:", error.code);
      console.log("Mensaje de error:", error.message);
  
      switch (error.code) {
        case "auth/user-not-found":
          setAuthError("El usuario no está registrado.");
          break;
        case "auth/wrong-password":
        case "auth/invalid-credential": // Firebase ahora usa este código para credenciales incorrectas
          setAuthError("Correo o contraseña incorrectos.");
          break;
        case "auth/invalid-email":
          setAuthError("Correo electrónico inválido.");
          break;
        case "auth/user-disabled":
          setAuthError("Este usuario ha sido deshabilitado.");
          break;
        case "auth/too-many-requests":
          setAuthError("Demasiados intentos fallidos. Intente más tarde.");
          break;
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
  
      // Guardar usuario en Firestore
      await setDoc(doc(db, "users", user.uid), {
        username,
        email,
        createdAt: serverTimestamp(),
      });
  
      // Guardar mensaje de éxito en AsyncStorage
      await AsyncStorage.setItem(
        "registrationSuccess",
        "Registro exitoso. Por favor, inicia sesión"
      );
  
      onSuccess(); // Redirigir al login tras el registro exitoso
    } catch (error) {
      console.log("Código de error:", error.code);
      console.log("Mensaje de error:", error.message);
      setAuthError("Error al registrar usuario");
    }
    setLoading(false);
  };
  

  return { login, register, errors, authError, loading };
}
