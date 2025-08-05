//KÜTÜPHANELER
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AxiosError } from "axios";
import { RootStackParamList, ErrorResponse } from "../types/types";

//SERVICES
import { register } from "../services/authApi";

//STYLES
import { registerStyles } from "../styles/RegisterScreenStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Register">;

const RegisterScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const validateEmail = (email: string): boolean => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleRegister = async () => {
    if (!validateEmail(email)) {
      Alert.alert(
        "Geçersiz E-posta",
        "Lütfen geçerli bir e-posta adresi girin."
      );
      return;
    }
    if (password.length < 6) {
      Alert.alert("Geçersiz Şifre", "Şifreniz en az 6 karakter olmalıdır.");
      return;
    }

    setIsLoading(true);
    try {
      await register(email, password);

      Alert.alert(
        "Kayıt Başarılı",
        "Hesabınız oluşturuldu. Lütfen giriş yapın."
      );
      navigation.navigate("Login");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        Alert.alert(
          "Kayıt Hatası",
          (error.response.data as ErrorResponse).message
        );
      } else {
        Alert.alert("Hata", "Kayıt yapılamadı. Lütfen tekrar deneyin.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={registerStyles.container}>
      <Text style={registerStyles.title}>Kayıt Ol</Text>
      <TextInput
        style={registerStyles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={registerStyles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={isLoading ? "Yükleniyor..." : "Kayıt Ol"}
        onPress={handleRegister}
        disabled={isLoading}
      />
      <Button
        title="Zaten bir hesabınız var mı? Giriş Yap"
        onPress={() => navigation.navigate("Login")}
      />
    </View>
  );
};

export default RegisterScreen;
