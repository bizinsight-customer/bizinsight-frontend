import { AxiosInstance } from "axios";

export const setupInterceptors = (api: AxiosInstance) => {
  api.interceptors.request.use(
    (config) => {
      return config;
    },
    (error) => Promise.reject(error)
  );
};
