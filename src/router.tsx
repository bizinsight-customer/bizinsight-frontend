import { createBrowserRouter, Navigate, RouteObject } from "react-router";
import App from "./App";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import { authRoutes } from "./features/auth/routes";
import { documentsRoutes } from "./features/documents/routes";
import { UserProfile } from "./features/profile/pages/UserProfile";
import { AppRouteConfig } from "./types/routes.types";

const routes: AppRouteConfig[] = [
  {
    element: <App />,
    children: [
      // Index route - redirect to dashboard
      {
        path: "/",
        element: <Navigate to="/dashboard" replace />,
      },
      ...authRoutes,
      {
        element: <MainLayout />,
        children: [
          {
            path: "/dashboard",
            element: <div>Dashboard Page</div>,
          },
          ...documentsRoutes,
          {
            path: "/analytics",
            element: <div>Analytics Page</div>,
          },
          {
            path: "/settings",
            element: <div>Settings Page</div>,
          },
          {
            path: "/profile",
            element: <UserProfile />,
          },
          // Catch-all route - redirect to dashboard
          {
            path: "*",
            element: <Navigate to="/dashboard" replace />,
          },
        ],
      },
    ],
  },
];

export const router = createBrowserRouter(routes as RouteObject[]);
