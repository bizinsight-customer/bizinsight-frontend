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
  baseURL: "/api",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
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
    LIST: "/documents/",
    GET: (id: string) => `/documents/${id}`,
    CREATE: "/documents/create",
    UPLOAD: "/documents/upload",
    DELETE: (id: string) => `/documents/${id}`,
    RECOGNIZE: "/documents/recognize",
    GET_TYPES: "/documents/types/get-types",
    DOWNLOAD: (id: string) => `/documents/${id}/download`,
    HISTORY: "/documents/history",
  },
  METRICS: {
    REVENUE: "/metrics/revenue",
    PROFIT: "/metrics/profit",
    EXPENSE_CATEGORIES: "/metrics/expense_categories",
    SALES: "/metrics/sales",
    CLIENTS: "/metrics/clients",
    SALARY: "/metrics/salary",
    FACILITY: "/metrics/facility",
    STOCK_PROCUREMENT: "/metrics/stock_procurement",
    UNFORESEEN_EXPENSES: "/metrics/unforeseen_expenses",
    MARKETING: "/metrics/marketing",
    AVERAGE_TICKET: "/metrics/average_ticket",
    COGS: "/metrics/cogs",
    RETURN_RATE: "/metrics/return_rate",
    REVENUE_EXPENSE_RATIO: "/metrics/revenue_expense_ratio",
    ROMI: "/metrics/romi",
  },
  AI_ANALYTICS: {
    REPORT: "/ai_analytics/report",
  },
  USER_SETTINGS: {
    UPDATE: "/users/me/settings",
    STATUS: "/users/me/settings/status",
    GET: "/users/me/settings",
  },
  CURRENCIES: {
    LIST: "/currencies",
  },
} as const;

// Type for endpoint paths
export type ApiEndpoint = typeof API_ENDPOINTS;

export default apiConfig;
