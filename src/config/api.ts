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
    HUI: "HUI",
  },
};

// API endpoints with type safety
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: "/auth/jwt/login",
    REGISTER: "/auth/register",
    LOGOUT: "/auth/jwt/logout",
    ME: "/auth/users/me",
    USERS: {
      DETAIL: (id: string) => `/auth/users/${id}`,
    },
  },
  DOCUMENTS: {
    LIST: "/documents",
    GET: (id: string) => `/documents/${id}`,
    CREATE: "/documents/create",
    UPLOAD: "/documents/upload",
    DELETE: (id: string) => `/documents/${id}`,
    RECOGNIZE: "/documents/recognize",
    GET_TYPES: "/documents/types/get-types",
  },
} as const;

// Type for endpoint paths
export type ApiEndpoint = typeof API_ENDPOINTS;

export default apiConfig;
