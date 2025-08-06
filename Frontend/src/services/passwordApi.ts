// KÜTÜPHANELER
import axios from "axios";
import * as SecureStore from "expo-secure-store";

// CONST
import { API_URL } from "@env";

// TYPES
import { PasswordItem, ErrorResponse } from "../types/types";

const getAuthHeaders = async () => {
  const token = await SecureStore.getItemAsync("userToken");
  if (token) {
    return {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
  }
  return {};
};

export const getPasswords = async (): Promise<PasswordItem[]> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.get<PasswordItem[]>(
      `${API_URL}/passwords`,
      headers
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response.data as ErrorResponse;
      console.error("API Şifreleri Getirme Hatası:", serverError.message);
    } else {
      console.error("Bilinmeyen Hata:", error);
    }
    throw error;
  }
};

export const createPassword = async (
  service: string,
  username: string,
  password: string
): Promise<PasswordItem> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.post<PasswordItem>(
      `${API_URL}/passwords`,
      { service, username, password },
      headers
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response.data as ErrorResponse;
      console.error("API Şifre Oluşturma Hatası:", serverError.message);
    } else {
      console.error("Bilinmeyen Hata:", error);
    }
    throw error;
  }
};

export const updatePassword = async (
  id: string,
  service: string,
  username: string,
  password: string
): Promise<PasswordItem> => {
  try {
    const headers = await getAuthHeaders();
    const response = await axios.put<PasswordItem>(
      `${API_URL}/passwords/${id}`,
      { service, username, password },
      headers
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response.data as ErrorResponse;
      console.error("API Şifre Güncelleme Hatası:", serverError.message);
    } else {
      console.error("Bilinmeyen Hata:", error);
    }
    throw error;
  }
};

export const deletePassword = async (id: string): Promise<void> => {
  try {
    const headers = await getAuthHeaders();
    await axios.delete(`${API_URL}/passwords/${id}`, headers);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response.data as ErrorResponse;
      console.error("API Şifre Silme Hatası:", serverError.message);
    } else {
      console.error("Bilinmeyen Hata:", error);
    }
    throw error;
  }
};
