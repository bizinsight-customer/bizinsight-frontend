import { API_ENDPOINTS } from "@/config/api";
import api from "@/services/api/axios";
import {
  BearerResponse,
  LoginCredentials,
  UserCreate,
  UserRead,
  UserUpdate,
} from "../types/auth.types";

export const authService = {
  login: (credentials: LoginCredentials) => {
    const formData = new URLSearchParams();
    formData.append("username", credentials.username);
    formData.append("password", credentials.password);

    return api.post<BearerResponse>(API_ENDPOINTS.AUTH.LOGIN, formData, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
  },

  register: (data: UserCreate) =>
    api.post<UserRead>(API_ENDPOINTS.AUTH.REGISTER, data),

  logout: () => api.post(API_ENDPOINTS.AUTH.LOGOUT),

  getCurrentUser: () => api.get<UserRead>(API_ENDPOINTS.AUTH.ME),

  updateCurrentUser: (data: UserUpdate) =>
    api.patch<UserRead>(API_ENDPOINTS.AUTH.ME, data),

  getUser: (id: string) =>
    api.get<UserRead>(API_ENDPOINTS.AUTH.USERS.DETAIL(id)),

  updateUser: (id: string, data: UserUpdate) =>
    api.patch<UserRead>(API_ENDPOINTS.AUTH.USERS.DETAIL(id), data),

  deleteUser: (id: string) => api.delete(API_ENDPOINTS.AUTH.USERS.DETAIL(id)),
} as const;
