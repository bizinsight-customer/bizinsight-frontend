import { apiConfig } from "@/config/api";
import axios from "axios";

// Create axios instance with configuration from api config
const api = axios.create(apiConfig);

export default api;
