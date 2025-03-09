import { globalNavigate } from "@/components/GlobalNavigationHandler";
import { AUTH_ERROR_MESSAGES } from "@/constants/error-messages";
import { AUTH_ROUTES } from "@/features/auth/routes";
import { getCurrentUserToken } from "@/services/firebase/auth";
import { AxiosInstance } from "axios";

type ErrorHandler = (error: Error) => void;

export const setupAuthInterceptor = (
  api: AxiosInstance,
  handleError: ErrorHandler
) => {
  console.log("SETTING UP AUTH INTERCEPTOR");

  const handleAuthError = (error: Error) => {
    handleError(error);
    // Navigate to sign in page
    globalNavigate(AUTH_ROUTES.SIGN_IN);
  };

  api.interceptors.request.use(async (config) => {
    try {
      const token = await getCurrentUserToken();
      console.log("TOKEN", token);
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        return config;
      }

      // If we get here, we have no token and it's not a public endpoint
      // This means user is not authenticated
      console.log("No token found, throwing USER_NOT_AUTHENTICATED error"); // Add this log
      const error = new Error(AUTH_ERROR_MESSAGES.USER_NOT_AUTHENTICATED);
      throw error;
    } catch (error) {
      console.error("Error in auth interceptor:", error);
      console.error("Error details:", error); // Log the error details
      // Create a proper error object
      const authError = new Error(AUTH_ERROR_MESSAGES.AUTHENTICATION_REQUIRED);
      handleAuthError(authError);
      throw authError;
    }
  });

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
          handleAuthError(authError);
          throw authError;
        } catch (refreshError) {
          // If token refresh fails, sign out the user
          // await auth.signOut();
          const authError = new Error(
            AUTH_ERROR_MESSAGES.AUTHENTICATION_REQUIRED
          );
          handleAuthError(authError);
          throw authError;
        }
      }

      // For other errors, just propagate them to the error boundary
      safeHandleError(error);
      return Promise.reject(error);
    }
  );
};
