import { AppRouteConfig } from "@/types/routes.types";
import AuthPage from "./pages/AuthPage";
import { SignUpSuccessPage } from "./pages/SignUpSuccessPage";

// Define route paths as const object for single source of truth
export const AUTH_ROUTES = {
  SIGN_IN: "/auth/signin",
  SIGN_UP: "/auth/signup",
  SIGN_UP_SUCCESS: "/auth/signup-success",
  RESET_PASSWORD: "/auth/reset-password/:token",
} as const;

export const authRoutes: AppRouteConfig[] = [
  {
    path: AUTH_ROUTES.SIGN_IN,
    element: <AuthPage />,
  },
  {
    path: AUTH_ROUTES.SIGN_UP,
    element: <AuthPage />,
  },
  {
    path: AUTH_ROUTES.SIGN_UP_SUCCESS,
    element: <SignUpSuccessPage />,
  },
  {
    path: AUTH_ROUTES.RESET_PASSWORD,
    element: <AuthPage />,
  },
];

// Derive route paths from authRoutes definition
type AuthRoutesType = typeof authRoutes;
export type AuthRoutePath = AuthRoutesType[number]["path"];

// Define route parameters based on paths
export type AuthRouteParams = {
  [AUTH_ROUTES.SIGN_IN]: undefined;
  [AUTH_ROUTES.SIGN_UP]: undefined;
  [AUTH_ROUTES.SIGN_UP_SUCCESS]: undefined;
  [AUTH_ROUTES.RESET_PASSWORD]: { token: string };
};
