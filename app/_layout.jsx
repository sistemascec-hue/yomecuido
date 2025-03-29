import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import { AuthProvider } from "../contexts/AuthContext";
export default function RootLayout() {
  useFonts({
    "roboto-semibold": require("../assets/fonts/RobotoSlab-SemiBold.ttf"),
    "roboto-bold": require("../assets/fonts/RobotoSlab-Bold.ttf"),
    "roboto-regular": require("../assets/fonts/RobotoSlab-Regular.ttf"),
    "sugo-extra-light": require("../assets/fonts/Sugo_ExtraLightTrial.ttf"),
    "sugo-trial": require("../assets/fonts/SugoTrial.ttf"),
  });
  return (
    <AuthProvider>
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="login" />
      <Stack.Screen name="home" />
    </Stack>
    </AuthProvider>
  );
}
