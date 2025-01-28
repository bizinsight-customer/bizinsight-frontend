import api from "@/services/api/axios";
import { ApiResponse } from "@/types/api.types";
import { getRefreshToken } from "./tokenService";

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export const login = async (
  credentials: LoginCredentials
): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/login",
    credentials
  );
  return response.data.data;
};

export const register = async (data: RegisterData): Promise<AuthResponse> => {
  const response = await api.post<ApiResponse<AuthResponse>>(
    "/auth/register",
    data
  );
  return response.data.data;
};

export const refreshTokens = async (): Promise<AuthTokens> => {
  const refreshToken = getRefreshToken();
  const response = await api.post<ApiResponse<AuthTokens>>("/auth/refresh", {
    refresh_token: refreshToken,
  });
  return response.data.data;
};
