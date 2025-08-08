// KÜTÜPHANELER
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "react-native";

// SCREENS
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";
import PasswordFormScreen from "src/screens/PasswordFormScreen";
import PasswordDetailScreen from "src/screens/PasswordDetailScreen";

// CONTEXT
import { AuthProvider, useAuth } from "./src/context/authContext";

// TYPES
import { RootStackParamList } from "./src/types/types";

const AuthStack = createNativeStackNavigator<RootStackParamList>();
const AppStack = createNativeStackNavigator<RootStackParamList>();

const AuthScreens = () => (
  <AuthStack.Navigator>
    <AuthStack.Screen
      name="Login"
      component={LoginScreen}
      options={{ headerShown: false }}
    />
    <AuthStack.Screen
      name="Register"
      component={RegisterScreen}
      options={{ headerShown: false }}
    />
  </AuthStack.Navigator>
);

const AppScreens = () => (
  <AppStack.Navigator
    screenOptions={{
      headerStyle: {
        backgroundColor: "#1c2125",
      },
      headerTintColor: "#f8f9fa",
      headerTitleStyle: {
        fontWeight: "bold",
      },
    }}
  >
    <AppStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
    <AppStack.Screen
      name="PasswordForm"
      component={PasswordFormScreen}
      options={{ title: "Şifre Ekle/Düzenle" }}
    />
    <AppStack.Screen
      name="PasswordDetail"
      component={PasswordDetailScreen}
      options={{ title: "Şifre Detayı" }}
    />
  </AppStack.Navigator>
);

const AppContent = () => {
  const { userToken } = useAuth();
  return (
    <NavigationContainer>
      {userToken ? <AppScreens /> : <AuthScreens />}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <StatusBar />
    </AuthProvider>
  );
}
