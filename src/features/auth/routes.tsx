import { RouteObject } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./pages/AuthPage";

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
      },
    ],
  },
];
