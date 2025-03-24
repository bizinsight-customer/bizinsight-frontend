import { AuthRouteParams } from "@/features/auth/routes";
import { ChartType } from "@/features/dashboard/config/chart-types";
import { RouteConfig } from "./routes.base";

// Define the main app routes
export interface AppRouteParams extends AuthRouteParams {
  [key: string]: undefined | Record<string, string | ChartType>;
  "/": undefined;
  "/dashboard": undefined;
  "/dashboard/chart/:chartType": { chartType: ChartType };
  "/documents": undefined;
  "/documents/history": undefined;
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
export function isValidRoutePath(path: string): path is string {
  return Object.values(path).some((route) => route === path);
}

// Helper type to get params for a specific route
export type RouteParamsFor<Route extends AppRoutePath> =
  AppRouteParams[Route] extends Record<string, string | ChartType>
    ? AppRouteParams[Route]
    : never;
