//KÜTÜPHANELER
import React, { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as SecureStore from "expo-secure-store";
import { ActivityIndicator, View } from "react-native";

//SCREENS
import LoginScreen from "./src/screens/LoginScreen";
import RegisterScreen from "./src/screens/RegisterScreen";
import HomeScreen from "./src/screens/HomeScreen";

//TYPES
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
  <AppStack.Navigator>
    <AppStack.Screen
      name="Home"
      component={HomeScreen}
      options={{ headerShown: false }}
    />
  </AppStack.Navigator>
);

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);

  useEffect(() => {
    const checkToken = async () => {
      const token = await SecureStore.getItemAsync("userToken");
      setUserToken(token);
      setIsLoading(false);
    };
    checkToken();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {userToken ? <AppScreens /> : <AuthScreens />}
    </NavigationContainer>
  );
}
