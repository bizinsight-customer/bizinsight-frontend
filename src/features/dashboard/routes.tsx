import { AppRouteConfig } from "@/types/routes.types";
import { ChartPage } from "./pages/ChartPage";
import { DashboardPage } from "./pages/DashboardPage";

export const dashboardRoutes: AppRouteConfig[] = [
  {
    path: "/dashboard",
    element: <DashboardPage />,
  },
  {
    path: "/dashboard/chart/:chartType",
    element: <ChartPage />,
  },
];
