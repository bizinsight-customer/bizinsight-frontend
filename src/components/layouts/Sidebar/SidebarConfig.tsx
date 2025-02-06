import { AppRoutePath } from "@/types/routes.types";
import {
  Analytics as AnalyticsIcon,
  Dashboard as DashboardIcon,
  Description as DocumentsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

export const DRAWER_WIDTH = 240;

export const menuItems = [
  {
    path: "/dashboard" as AppRoutePath,
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/documents" as AppRoutePath,
    label: "Documents",
    icon: <DocumentsIcon />,
  },
  {
    path: "/analytics" as AppRoutePath,
    label: "Analytics",
    icon: <AnalyticsIcon />,
  },
  {
    path: "/settings" as AppRoutePath,
    label: "Settings",
    icon: <SettingsIcon />,
  },
] as const;
