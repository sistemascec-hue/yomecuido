import { View, Text, Pressable, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function SuccessScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Restablecimiento Exitoso!</Text>
      <Text style={styles.message}>Tu contraseña ha sido restablecida correctamente.</Text>
      
      <Pressable style={styles.button} onPress={() => router.replace("/login")}>
        <Text style={styles.buttonText}>Volver al Login</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", padding: 20 },
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
  message: { fontSize: 16, textAlign: "center", marginBottom: 20 },
  button: { backgroundColor: "#007AFF", padding: 12, borderRadius: 8 },
  buttonText: { color: "white", fontSize: 16, fontWeight: "bold" },
});
