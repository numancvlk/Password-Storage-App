//KÜTÜPHANELER
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  ActivityIndicator,
  TouchableOpacity,
  Alert,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

//TYPES
import { RootStackParamList } from "../types/types";

//SERVICES
import { createPassword, updatePassword } from "../services/passwordApi";

//STYLES
import { passwordFormStyles } from "src/styles/PasswordFormScreen";

type Props = NativeStackScreenProps<RootStackParamList, "PasswordForm">;

const PasswordFormScreen = ({ navigation, route }: Props) => {
  const passwordToEdit = route.params?.passwordItem;

  const [service, setService] = useState(passwordToEdit?.service || "");
  const [username, setUsername] = useState(passwordToEdit?.username || "");
  const [password, setPassword] = useState(passwordToEdit?.password || "");
  const [isLoading, setIsLoading] = useState(false);

  const isEditing = !!passwordToEdit;

  const handleSave = async () => {
    if (!service || !username || !password) {
      Alert.alert("Hata", "Tüm alanlar zorunludur.");
      return;
    }

    setIsLoading(true);
    try {
      if (isEditing) {
        await updatePassword(passwordToEdit._id, service, username, password);
        Alert.alert("Başarılı", "Şifre başarıyla güncellendi.");
      } else {
        await createPassword(service, username, password);
        Alert.alert("Başarılı", "Şifre başarıyla eklendi.");
      }
      navigation.goBack();
    } catch (error) {
      Alert.alert("Hata", "Şifre işlemi sırasında bir sorun oluştu.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={passwordFormStyles.container}>
      <Text style={passwordFormStyles.title}>
        {isEditing ? "Şifreyi Düzenle" : "Yeni Şifre Ekle"}
      </Text>
      <TextInput
        style={passwordFormStyles.input}
        placeholder="Servis (Ör: Google, GitHub)"
        placeholderTextColor="#6c757d"
        value={service}
        onChangeText={setService}
      />
      <TextInput
        style={passwordFormStyles.input}
        placeholder="Kullanıcı Adı veya E-posta"
        placeholderTextColor="#6c757d"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={passwordFormStyles.input}
        placeholder="Şifre"
        placeholderTextColor="#6c757d"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isEditing}
      />
      <TouchableOpacity
        style={passwordFormStyles.buttonContainer}
        onPress={handleSave}
        disabled={isLoading}
      >
        <View style={passwordFormStyles.saveButton}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={passwordFormStyles.saveButtonText}>Kaydet</Text>
          )}
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PasswordFormScreen;
