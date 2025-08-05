export interface AuthResponse {
  _id: string;
  email: string;
  token: string;
}

export interface ErrorResponse {
  message: string;
}

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  Home: undefined;
};
