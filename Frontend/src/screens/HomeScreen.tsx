// KÜTÜPHANE
import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";

//TYPES
import { RootStackParamList, PasswordItem } from "../types/types";

//SERVICES
import { getPasswords, deletePassword } from "../services/passwordApi";

//CONTEXT
import { useAuth } from "src/context/authContext";

//STYLES
import { homeStyles } from "src/styles/HomeScreenStyles";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

const HomeScreen = ({ navigation }: Props) => {
  const { logout } = useAuth();
  const [passwords, setPasswords] = useState<PasswordItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState<{ [key: string]: boolean }>(
    {}
  );

  const fetchPasswords = async () => {
    try {
      setIsLoading(true);
      const data = await getPasswords();
      setPasswords(data);
    } catch (error) {
      Alert.alert("Hata", "Şifreler getirilemedi.");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    try {
      await deletePassword(id);
      Alert.alert("Başarılı", "Şifre başarıyla silindi.");
      fetchPasswords();
    } catch (error) {
      Alert.alert("Hata", "Şifre silinirken bir sorun oluştu.");
      console.error(error);
    } finally {
      setIsDeleting(null);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchPasswords();
    }, [])
  );

  const toggleShowPassword = (id: string) => {
    setShowPassword((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const renderItem = ({ item }: { item: PasswordItem }) => (
    <TouchableOpacity
      style={homeStyles.passwordItem}
      onPress={() =>
        navigation.navigate("PasswordDetail", { passwordItem: item })
      }
    >
      <View style={homeStyles.passwordDetails}>
        <Text style={homeStyles.serviceText}>{item.service}</Text>
        <Text style={homeStyles.usernameText}>{item.username}</Text>
      </View>
      <View style={homeStyles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PasswordForm", { passwordItem: item })
          }
          style={homeStyles.editButton}
        >
          <Text style={homeStyles.editText}>Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item._id)}
          disabled={isDeleting === item._id}
          style={homeStyles.deleteButton}
        >
          <Text style={homeStyles.deleteText}>
            {isDeleting === item._id ? "Siliniyor..." : "Sil"}
          </Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={homeStyles.container}>
      <Text style={homeStyles.title}>Şifrelerim</Text>
      <TouchableOpacity
        style={homeStyles.mainActionButton}
        onPress={() => navigation.navigate("PasswordForm", undefined)}
      >
        <Text style={homeStyles.mainActionButtonText}>Yeni Şifre Ekle</Text>
      </TouchableOpacity>
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#007bff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={passwords}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          style={homeStyles.list}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <Text style={homeStyles.emptyText}>
              Henüz kayıtlı şifreniz yok.
            </Text>
          }
        />
      )}
      <TouchableOpacity style={homeStyles.logoutButton} onPress={logout}>
        <Text style={homeStyles.logoutButtonText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
