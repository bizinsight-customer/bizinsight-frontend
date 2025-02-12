import { AxiosInstance } from "axios";
import { getCurrentUserToken } from "../firebase/auth";

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    async (config) => {
      try {
        console.log("Request Interceptor");
        console.log("config", config);
        const token = await getCurrentUserToken();
        console.log("token", token);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Error setting auth token:", error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => Promise.reject(error)
  );
};
