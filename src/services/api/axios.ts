import { ENV } from "@/config/env";
import axios from "axios";
import { setupInterceptors } from "./interceptors";

const api = axios.create({
  baseURL: ENV.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

setupInterceptors(api);

export default api;
