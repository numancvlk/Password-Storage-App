// KÜTÜPHANE
import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
  TouchableOpacity,
} from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useFocusEffect } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

//TYPES
import { RootStackParamList, PasswordItem } from "../types/types";

//SERVICES
import { getPasswords, deletePassword } from "../services/passwordApi";

//CONTEXT
import { useAuth } from "src/context/authContext";

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
    <View style={styles.passwordItem}>
      <View>
        <Text style={styles.serviceText}>{item.service}</Text>
        <Text style={styles.usernameText}>{item.username}</Text>
        <View style={styles.passwordContainer}>
          <Text style={styles.passwordText}>
            {showPassword[item._id] ? item.password : "●●●●●●●●"}
          </Text>
          <TouchableOpacity onPress={() => toggleShowPassword(item._id)}>
            <Ionicons
              name={showPassword[item._id] ? "eye-off" : "eye"}
              size={20}
              color="#6c757d"
            />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate("PasswordForm", { passwordItem: item })
          }
          style={styles.editButton}
        >
          <Text style={styles.editText}>Düzenle</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => handleDelete(item._id)}
          disabled={isDeleting === item._id}
          style={styles.deleteButton}
        >
          <Text style={styles.deleteText}>
            {isDeleting === item._id ? "Siliniyor..." : "Sil"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şifrelerim</Text>
      <Button
        title="Yeni Şifre Ekle"
        onPress={() => navigation.navigate("PasswordForm", undefined)}
      />
      {isLoading ? (
        <ActivityIndicator
          size="large"
          color="#0000ff"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={passwords}
          keyExtractor={(item) => item._id}
          renderItem={renderItem}
          style={styles.list}
          contentContainerStyle={{ flexGrow: 1 }}
          ListEmptyComponent={
            <Text style={styles.emptyText}>Henüz kayıtlı şifreniz yok.</Text>
          }
        />
      )}
      <Button title="Çıkış Yap" onPress={logout} color="#dc3545" />
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
  list: {
    flex: 1,
    marginTop: 20,
  },
  passwordItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
  serviceText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  usernameText: {
    fontSize: 16,
    color: "#6c757d",
  },
  passwordText: {
    fontSize: 16,
    fontFamily: "monospace",
    marginTop: 5,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  editButton: {
    marginRight: 10,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  editText: {
    color: "#fff",
    fontWeight: "bold",
  },
  deleteButton: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: "#dc3545",
    borderRadius: 5,
  },
  deleteText: {
    color: "#fff",
    fontWeight: "bold",
  },
  emptyText: {
    textAlign: "center",
    marginTop: 50,
    fontSize: 16,
    color: "#6c757d",
  },
});

export default HomeScreen;
