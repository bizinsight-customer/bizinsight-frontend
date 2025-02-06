import { ENV } from "./env";

// API configuration types
export interface ApiConfig {
  baseURL: string;
  headers: {
    "Content-Type": string;
    Accept: string;
  };
}

// Base API configuration
export const apiConfig: ApiConfig = {
  baseURL: ENV.API_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
};

// API endpoints with type safety
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/auth/jwt/login",
    REGISTER: "/auth/auth/register",
    LOGOUT: "/auth/auth/jwt/logout",
    ME: "/auth/users/me",
    USERS: {
      DETAIL: (id: string) => `/auth/users/${id}`,
    },
  },
  DOCUMENTS: {
    RECOGNIZE: "/documents/recognize",
  },
} as const;

// Type for endpoint paths
export type ApiEndpoint = typeof API_ENDPOINTS;

export default apiConfig;
