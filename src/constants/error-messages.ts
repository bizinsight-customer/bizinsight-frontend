export const AUTH_ERROR_MESSAGES = {
  AUTHENTICATION_REQUIRED: "Authentication required",
  USER_NOT_AUTHENTICATED: "User not authenticated",
} as const;

// Type for auth error messages
export type AuthErrorMessage =
  (typeof AUTH_ERROR_MESSAGES)[keyof typeof AUTH_ERROR_MESSAGES];

// Helper function to check if a message is an auth error
export const isAuthError = (message: string): message is AuthErrorMessage => {
  return Object.values(AUTH_ERROR_MESSAGES).includes(
    message as AuthErrorMessage
  );
};
