import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Pressable,
  Dimensions,
} from "react-native";
import MyButton from "./Button";
import { CheckIcon, CheckIconfail } from "./Icons";

const { width } = Dimensions.get("window");

const CustomAlert = ({
  visible,
  onClose,
  title = "¡Éxito!",
  message = "Operación completada.",
  success = true,
  primaryButtonText = "Aceptar",
  onPrimaryPress,
  secondaryButtonText,       
  onSecondaryPress,           
}) => {
  return (
    <Modal
      transparent
      visible={visible}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.icon}>
            {success ? (
              <CheckIcon size={50} color="#4CAF50" />
            ) : (
              <CheckIconfail size={50} color="#F44336" />
            )}
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <MyButton
            text={primaryButtonText}
            onPress={onPrimaryPress || onClose}
            backgroundColor={success ? "#4CAF50" : "#F44336"}
            textColor="#fff"
          />

          {secondaryButtonText && (
            <Pressable
              style={styles.secondaryButton}
              onPress={onSecondaryPress || onClose}
            >
              <Text style={styles.secondaryText}>{secondaryButtonText}</Text>
            </Pressable>
          )}
        </View>
      </View>
    </Modal>
  );
};

export default CustomAlert;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  container: {
    width: width * 0.8,
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 16,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  icon: {
    marginBottom: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2E1C42",
    marginBottom: 10,
    textAlign: "center",
  },
  message: {
    fontSize: 16,
    color: "#555",
    marginBottom: 25,
    textAlign: "center",
  },
  secondaryButton: {
    marginTop: 12,
    paddingVertical: 8,
    paddingHorizontal: 20,
  },
  secondaryText: {
    color: "#888",
    fontSize: 16,
    fontWeight: "600",
  },
});
