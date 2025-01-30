import { AuthRouteParams } from "@/features/auth/routes.types";
import { BaseRouteParams, RouteConfig, RoutePath } from "./routes.base";

// Combine all feature route params
export interface AppRouteParams extends BaseRouteParams, AuthRouteParams {
  // Root routes
  "/": undefined;
  // Add other feature route params as needed
}

// Export the combined route path type
export type AppRoutePath = RoutePath<AppRouteParams>;

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
