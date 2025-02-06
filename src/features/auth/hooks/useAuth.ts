import { useApi } from "@/hooks/useApi";
import { getRefreshToken } from "@/services/core/tokenService";
import { authService } from "../services/authService";
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
    return loginApi.request(() => authService.login(credentials));
  };

  const registerUser = async (data: RegisterData) => {
    return registerApi.request(() => authService.register(data));
  };

  const refreshUserTokens = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) {
      throw new Error("No refresh token available");
    }
    return refreshApi.request(() => authService.refresh(refreshToken));
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
