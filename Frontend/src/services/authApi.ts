//KÜTÜPHANELER
import axios from "axios";

//CONST
import { API_URL } from "@env";

//TYPES
import { AuthResponse, ErrorResponse } from "../types/types";

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>(`${API_URL}/auth/login`, {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response.data as ErrorResponse;
      console.error("API Giriş Hatası:", serverError.message);
    } else {
      console.error("Bilinmeyen Hata:", error);
    }
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await axios.post<AuthResponse>(
      `${API_URL}/auth/register`,
      {
        email,
        password,
      }
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      const serverError = error.response.data as ErrorResponse;
      console.error("API Kayıt Hatası:", serverError.message);
    } else {
      console.error("Bilinmeyen Hata:", error);
    }
    throw error;
  }
};
