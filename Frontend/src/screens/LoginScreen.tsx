// KÜTÜPHANELER
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AxiosError } from "axios";

//STYLES
import { loginStyles } from "../styles/LoginScreenStyles";

//TYPES
import { RootStackParamList } from "../types/types";

// CONTEXT
import { useAuth } from "../context/authContext";

// SERVICES
import { login } from "../services/authApi";

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { login: authLogin } = useAuth();

  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const authData = await login(email, password);
      authLogin(authData.token);
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
      <View style={loginStyles.logoContainer}>
        <Text style={loginStyles.logo}>PassShield</Text>
        <Text style={loginStyles.slogan}>Şifreleriniz Güvende</Text>
      </View>
      <TextInput
        style={loginStyles.input}
        placeholder="E-posta"
        placeholderTextColor="#6c757d"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={loginStyles.input}
        placeholder="Şifre"
        placeholderTextColor="#6c757d"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity
        style={loginStyles.buttonContainer}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <View style={loginStyles.button}>
          {isLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={loginStyles.buttonText}>Giriş Yap</Text>
          )}
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={loginStyles.buttonContainer}
        onPress={() => navigation.navigate("Register")}
      >
        <View style={loginStyles.secondaryButton}>
          <Text style={loginStyles.secondaryButtonText}>
            Hesabınız yok mu? Kayıt Ol
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
