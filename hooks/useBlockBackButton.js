// hooks/useBlockBackButton.js
import { useCallback } from "react";
import { BackHandler } from "react-native";
import { useFocusEffect } from "expo-router";

export const useBlockBackButton = (shouldExitApp = true) => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        if (shouldExitApp) {
          BackHandler.exitApp(); // 🚪 Salir de la app
        }
        return true; // Evita volver atrás
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () =>
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
    }, [shouldExitApp])
  );
};
