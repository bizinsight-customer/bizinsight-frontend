import { apiConfig } from "@/config/api";
import axios from "axios";
import { setupInterceptors } from "./interceptors";

// Create axios instance with configuration from api config
const api = axios.create(apiConfig);

// Setup interceptors for authentication, error handling, etc.
setupInterceptors(api);

export default api;
