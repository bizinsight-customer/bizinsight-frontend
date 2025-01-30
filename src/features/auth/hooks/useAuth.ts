import { useApi } from "@/hooks/useApi";
import { getRefreshToken } from "@/services/core/tokenService";
import {
  AuthResponse,
  AuthTokens,
  LoginCredentials,
  RegisterData,
} from "../types/auth.types";

export const useAuth = () => {
  const loginApi = useApi<AuthResponse>();
  const registerApi = useApi<AuthResponse>();
  const refreshApi = useApi<AuthTokens>();

  const loginUser = async (credentials: LoginCredentials) => {
    return loginApi.request({
      method: "POST",
      url: "/auth/login",
      data: credentials,
    });
  };

  const registerUser = async (data: RegisterData) => {
    return registerApi.request({
      method: "POST",
      url: "/auth/register",
      data,
    });
  };

  const refreshUserTokens = async () => {
    const refreshToken = getRefreshToken();
    return refreshApi.request({
      method: "POST",
      url: "/auth/refresh",
      data: { refresh_token: refreshToken },
    });
  };

  return {
    login: {
      execute: loginUser,
      isLoading: loginApi.isLoading,
      error: loginApi.error,
      data: loginApi.data,
    },
    register: {
      execute: registerUser,
      isLoading: registerApi.isLoading,
      error: registerApi.error,
      data: registerApi.data,
    },
    refresh: {
      execute: refreshUserTokens,
      isLoading: refreshApi.isLoading,
      error: refreshApi.error,
      data: refreshApi.data,
    },
  };
};
