// KÜTÜPHANELER
import React, { createContext, useState, useEffect, useContext } from "react";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View, Alert } from "react-native";
import { jwtDecode } from "jwt-decode";
import * as LocalAuthentication from "expo-local-authentication";

// TYPES
interface AuthContextType {
  userToken: string | null;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const isTokenExpired = (token: string): boolean => {
    try {
      const decodedToken: { exp: number } = jwtDecode(token);
      const currentTime = Date.now() / 1000;
      return decodedToken.exp < currentTime;
    } catch (error) {
      console.error("Token çözme hatası:", error);
      return true;
    }
  };

  const login = async (token: string) => {
    await SecureStore.setItemAsync("userToken", token);
    setUserToken(token);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync("userToken");
    setUserToken(null);
  };

  useEffect(() => {
    const bootstrapAsync = async () => {
      let storedToken: string | null = null;
      try {
        storedToken = await SecureStore.getItemAsync("userToken");

        if (storedToken && !isTokenExpired(storedToken)) {
          const hasHardware = await LocalAuthentication.hasHardwareAsync();
          const isEnrolled = await LocalAuthentication.isEnrolledAsync();

          if (hasHardware && isEnrolled) {
            const authResult = await LocalAuthentication.authenticateAsync({
              promptMessage: "Uygulamaya erişmek için kimliğinizi doğrulayın",
              disableDeviceFallback: true,
            });

            if (authResult.success) {
              setUserToken(storedToken);
            } else {
              await logout();
              Alert.alert(
                "Kimlik Doğrulama Başarısız",
                "Uygulamaya erişim reddedildi."
              );
            }
          } else {
            setUserToken(storedToken);
          }
        } else {
          await logout();
        }
      } catch (error) {
        console.error(
          "Token yüklenirken veya doğrulanırken hata oluştu",
          error
        );
        await logout();
      } finally {
        setIsLoading(false);
      }
    };

    bootstrapAsync();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ userToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
