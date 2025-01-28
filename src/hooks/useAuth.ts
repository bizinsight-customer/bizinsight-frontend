import { LoginCredentials, RegisterData } from "@/services/auth/authService";
import { useAuthStore } from "@/store/slices/authSlice";
import { useCallback } from "react";
import { useApi } from "./useApi";

export const useAuth = () => {
  const { setAuth, clearAuth, user, isAuthenticated } = useAuthStore();
  const { request, isLoading, error } = useApi();

  const login = useCallback(
    async (credentials: LoginCredentials) => {
      const response = await request({
        url: "/auth/login",
        method: "POST",
        data: credentials,
      });
      setAuth(response.user, response.tokens);
      return response;
    },
    [request, setAuth]
  );

  const register = useCallback(
    async (data: RegisterData) => {
      const response = await request({
        url: "/auth/register",
        method: "POST",
        data,
      });
      setAuth(response.user, response.tokens);
      return response;
    },
    [request, setAuth]
  );

  const logout = useCallback(() => {
    clearAuth();
  }, [clearAuth]);

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
  };
};
