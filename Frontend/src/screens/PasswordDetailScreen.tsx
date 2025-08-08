//KÜTÜPHANELER
import React, { useState } from "react";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import * as Clipboard from "expo-clipboard";

//TYPES
import { RootStackParamList } from "../types/types";

//STYLES
import { passwordDetailStyles } from "src/styles/PasswordDetailScreenStyles";

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
    <View style={passwordDetailStyles.container}>
      <Text style={passwordDetailStyles.serviceTitle}>
        {passwordItem.service}
      </Text>

      <View style={passwordDetailStyles.detailCard}>
        <Text style={passwordDetailStyles.label}>Kullanıcı Adı:</Text>
        <View style={passwordDetailStyles.copyableContainer}>
          <Text style={passwordDetailStyles.value}>
            {passwordItem.username}
          </Text>
          <TouchableOpacity
            onPress={() => handleCopy(passwordItem.username, "username")}
          >
            <Ionicons name="copy-outline" size={24} color="#007bff" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={passwordDetailStyles.detailCard}>
        <Text style={passwordDetailStyles.label}>Şifre:</Text>
        <View style={passwordDetailStyles.passwordContainer}>
          <Text style={passwordDetailStyles.value}>
            {showPassword ? passwordItem.password : "●●●●●●●●"}
          </Text>
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={passwordDetailStyles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? "eye-off" : "eye"}
              size={24}
              color="#adb5bd"
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

      <View style={passwordDetailStyles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate("PasswordForm", { passwordItem })}
          style={passwordDetailStyles.editButton}
        >
          <Text style={passwordDetailStyles.editButtonText}>
            Şifreyi Düzenle
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default PasswordDetailScreen;
