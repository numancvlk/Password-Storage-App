//KÜTÜPHANELER
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

//TYPES
import { RootStackParamList } from "../types/types";

type Props = NativeStackScreenProps<RootStackParamList, "PasswordDetail">;

const PasswordDetailScreen = ({ route, navigation }: Props) => {
  const { passwordItem } = route.params;
  const [showPassword, setShowPassword] = useState(false);

  const handleCopy = async (text: string, type: "username" | "password") => {
    await Clipboard.setStringAsync(text);
    Alert.alert(
      "Kopyalandı",
      type === "username"
        ? "Kullanıcı adı panoya kopyalandı."
        : "Şifre panoya kopyalandı."
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.serviceTitle}>{passwordItem.service}</Text>

      <View style={styles.detailCard}>
        <Text style={styles.label}>Kullanıcı Adı:</Text>
        <View style={styles.copyableContainer}>
          <Text style={styles.value}>{passwordItem.username}</Text>
          <TouchableOpacity
            onPress={() => handleCopy(passwordItem.username, "username")}
          >
            <Ionicons name="copy-outline" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.detailCard}>
        <Text style={styles.label}>Şifre:</Text>
        <View style={styles.passwordContainer}>
          <Text style={styles.value}>
            {showPassword ? passwordItem.password : "●●●●●●●●"}
          </Text>
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#6c757d"
            />
          </TouchableOpacity>
          {showPassword && (
            <TouchableOpacity
              onPress={() => handleCopy(passwordItem.password, "password")}
            >
              <Ionicons name="copy-outline" size={24} color="#007bff" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Şifreyi Düzenle"
          onPress={() => navigation.navigate("PasswordForm", { passwordItem })}
          color="#007bff"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  serviceTitle: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  detailCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6c757d",
  },
  value: {
    fontSize: 18,
    marginTop: 5,
  },
  copyableContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  eyeIcon: {
    paddingLeft: 10,
    paddingRight: 10,
  },
  buttonContainer: {
    marginTop: 20,
  },
});

export default PasswordDetailScreen;
