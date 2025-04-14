import { AppRoutePath } from "@/types/routes.types";

export const DRAWER_WIDTH = 240;

export const menuItems = [
  {
    path: "/dashboard" as AppRoutePath,
    label: "Dashboard",
  },
  {
    path: "/documents" as AppRoutePath,
    label: "Storage",
  },
  {
    path: "/documents/history" as AppRoutePath,
    label: "History",
  },
  {
    path: "/profile" as AppRoutePath,
    label: "Settings",
  },
] as const;
