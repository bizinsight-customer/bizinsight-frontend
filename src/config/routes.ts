import { RouteParams, RoutePath } from "../types/routes.types";

export const ROUTES: RoutePath = {
  "auth/signin": "/auth/signin",
  "auth/signup": "/auth/signup",
  "auth/signup-success": "/auth/signup-success",
  dashboard: "/dashboard",
  reports: "/reports",
  "reports/detail": "/reports/detail/:reportId",
  "user/profile": "/user/profile/:userId",
} as const;

export function createPath<T extends keyof RouteParams>(
  route: T,
  params?: RouteParams[T]
): string {
  if (!params) return ROUTES[route];

  let path = ROUTES[route];
  Object.entries(params).forEach(([key, value]) => {
    path = path.replace(`:${key}`, String(value));
  });

  return path;
}

export function isRoute(path: string): path is keyof typeof ROUTES {
  return Object.values(ROUTES).includes(path as any);
}
