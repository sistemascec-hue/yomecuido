import { Stack } from "expo-router";

export default function NivelesLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="nivel1" />
      {/* <Stack.Screen name="nivel2" />
      <Stack.Screen name="nivel3" /> */}
      {/* Si agregas más niveles, solo añádelos aquí */}
    </Stack>
  );
}