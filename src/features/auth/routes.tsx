import { RouteObject } from "react-router";
import AuthLayout from "./layouts/AuthLayout";
import AuthPage from "./pages/AuthPage";
import { SignUpSuccessPage } from "./pages/SignUpSuccessPage";

export const authRoutes: RouteObject[] = [
  {
    element: <AuthLayout />,
    children: [
      {
        path: "/auth",
        element: <AuthPage />,
      },
      {
        path: "signup/success",
        element: <SignUpSuccessPage />,
      },
    ],
  },
];
