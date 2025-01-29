import { createBrowserRouter } from "react-router";
import { authRoutes } from "./features/auth/routes";

export const router = createBrowserRouter([
  ...authRoutes,
  // ...existing code...
]);
