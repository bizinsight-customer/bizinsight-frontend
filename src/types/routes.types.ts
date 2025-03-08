import { AuthRouteParams } from "@/features/auth/routes";
import { RouteConfig } from "./routes.base";

// Define the main app routes
export interface AppRouteParams extends AuthRouteParams {
  "/": undefined;
  "/dashboard": undefined;
  "/documents": undefined;
  "/analytics": undefined;
  "/settings": undefined;
  "/profile": undefined;
  "/user-settings": undefined;
}

// Export the combined route path type
export type AppRoutePath = keyof AppRouteParams;

// Export route configuration type
export type AppRouteConfig = RouteConfig<AppRouteParams>;

// Type guard to check if a string is a valid route path
export function isValidRoutePath(path: string): path is AppRoutePath {
  return Object.values(path).some((route) => route === path);
}

// Helper type to get params for a specific route
export type RouteParamsFor<Path extends AppRoutePath> = Extract<
  AppRouteParams[keyof AppRouteParams],
  Record<string, string>
>;
