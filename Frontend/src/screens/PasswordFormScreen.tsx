//KÜTÜPHANELER
import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/types";
import { createPassword, updatePassword } from "../services/passwordApi";

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
    <View style={styles.container}>
      <Text style={styles.title}>
        {isEditing ? "Şifreyi Düzenle" : "Yeni Şifre Ekle"}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Servis (Ör: Google, GitHub)"
        value={service}
        onChangeText={setService}
      />
      <TextInput
        style={styles.input}
        placeholder="Kullanıcı Adı veya E-posta"
        value={username}
        onChangeText={setUsername}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Şifre"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={!isEditing}
      />
      <Button
        title={isLoading ? "Kaydediliyor..." : "Kaydet"}
        onPress={handleSave}
        disabled={isLoading}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f9fa",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});

export default PasswordFormScreen;
