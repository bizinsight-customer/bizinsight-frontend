import { createBrowserRouter, Navigate, RouteObject } from "react-router";
import App from "./App";
import MainLayout from "./components/layouts/MainLayout/MainLayout";
import { aiAnalyticsRoutes } from "./features/ai-analytics/routes/ai-analytics.routes";
import { authRoutes } from "./features/auth/routes";
import { dashboardRoutes } from "./features/dashboard/routes";
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
          ...dashboardRoutes,
          ...aiAnalyticsRoutes,
          ...documentsRoutes,
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
