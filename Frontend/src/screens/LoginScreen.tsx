//KÜTÜPHANELER
import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { RootStackParamList } from "../types/types";
import { loginStyles } from "../styles/LoginScreenStyles";
import { AxiosError } from "axios";

//SERVICES
import { login } from "../services/authApi";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const authData = await login(email, password);

      await SecureStore.setItemAsync("userToken", authData.token);

      Alert.alert("Başarılı", "Giriş yapıldı!");
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        Alert.alert(
          "Giriş Hatası",
          (error.response.data as { message: string }).message
        );
      } else {
        Alert.alert("Hata", "Giriş yapılamadı. Lütfen tekrar deneyin.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.title}>Giriş Yap</Text>
      <TextInput
        style={loginStyles.input}
        placeholder="E-posta"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={loginStyles.input}
        placeholder="Şifre"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <Button
        title={isLoading ? "Yükleniyor..." : "Giriş Yap"}
        onPress={handleLogin}
        disabled={isLoading}
      />
      <Button
        title="Hesabınız yok mu? Kayıt Ol"
        onPress={() => navigation.navigate("Register")}
      />
    </View>
  );
};

export default LoginScreen;
