import { Stack } from "expo-router";

export default function ResetPasswordLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      <Stack.Screen name="success" />
    </Stack>
  );
}
