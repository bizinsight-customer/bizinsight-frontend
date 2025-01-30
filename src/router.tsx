import { createBrowserRouter, RouteObject } from "react-router";
import { authRoutes } from "./features/auth/routes";
import { AppRouteConfig } from "./types/routes.types";

const routes: AppRouteConfig[] = [
  ...authRoutes,
  // Add more routes here
];

export const router = createBrowserRouter(routes as RouteObject[]);
