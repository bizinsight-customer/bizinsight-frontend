import { AppRoutePath } from "@/types/routes.types";
import {
  Psychology as AiAnalyticsIcon,
  Dashboard as DashboardIcon,
  Description as DocumentsIcon,
  History as HistoryIcon,
  AccountCircle as ProfileIcon,
} from "@mui/icons-material";

export const DRAWER_WIDTH = 240;

export const menuItems = [
  {
    path: "/dashboard" as AppRoutePath,
    label: "Dashboard",
    icon: <DashboardIcon />,
  },
  {
    path: "/ai-analytics" as AppRoutePath,
    label: "AI Analytics",
    icon: <AiAnalyticsIcon />,
  },
  {
    path: "/documents" as AppRoutePath,
    label: "Documents",
    icon: <DocumentsIcon />,
  },
  {
    path: "/documents/history" as AppRoutePath,
    label: "Documents History",
    icon: <HistoryIcon />,
  },
  {
    path: "/profile" as AppRoutePath,
    label: "Profile",
    icon: <ProfileIcon />,
  },
] as const;
