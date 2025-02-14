import { AUTH_ERROR_MESSAGES } from "@/constants/error-messages";
import { getCurrentUserToken } from "@/services/firebase/auth";
import { auth } from "@/services/firebase/firebase";
import { AxiosInstance } from "axios";

type ErrorHandler = (error: Error) => void;

export const setupInterceptors = (
  api: AxiosInstance,
  handleError: ErrorHandler
) => {
  api.interceptors.request.use(
    async (config) => {
      try {
        const token = await getCurrentUserToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
          return config;
        }

        // If we get here, we have no token and it's not a public endpoint
        // This means user is not authenticated
        const error = new Error(AUTH_ERROR_MESSAGES.USER_NOT_AUTHENTICATED);
        handleError(error);
        return Promise.reject(error);
      } catch (error) {
        console.error("Error in auth interceptor:", error);
        // Create a proper error object
        const authError = new Error(
          AUTH_ERROR_MESSAGES.AUTHENTICATION_REQUIRED
        );
        handleError(authError);
        return Promise.reject(authError);
      }
    },
    (error) => {
      handleError(error);
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      // Handle 401 Unauthorized errors
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          // Try to refresh the token
          const newToken = await getCurrentUserToken();
          if (newToken) {
            originalRequest.headers.Authorization = `Bearer ${newToken}`;
            return api(originalRequest);
          }
          // If we get here, token refresh failed
          const authError = new Error(
            AUTH_ERROR_MESSAGES.AUTHENTICATION_REQUIRED
          );
          handleError(authError);
          throw authError;
        } catch (error) {
          // If token refresh fails, sign out the user
          await auth.signOut();
          const authError = new Error(
            AUTH_ERROR_MESSAGES.AUTHENTICATION_REQUIRED
          );
          handleError(authError);
          throw authError;
        }
      }

      // For other errors, just propagate them to the error boundary
      handleError(error);
      return Promise.reject(error);
    }
  );
};
