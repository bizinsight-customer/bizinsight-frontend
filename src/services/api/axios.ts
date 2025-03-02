import { globalHandleError } from "@/components/error-boundary/GlobalErrorHandler";
import { apiConfig } from "@/config/api";
import axios from "axios";
import { setupAuthInterceptor } from "./auth.interceptor";
import { setupJsonApiInterceptor } from "./json-api.interceptor";

export const apiState = {
  isReady: false,
  isAuthInitialized: false,
};

// Create axios instance with configuration from api config
const api = axios.create(apiConfig);

// Setup JSON API interceptor
setupJsonApiInterceptor(api);
setupAuthInterceptor(api, globalHandleError);

export default api;
