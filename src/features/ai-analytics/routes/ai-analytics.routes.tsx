import { AppRouteConfig } from "@/types/routes.types";
import { AiAnalyticsPage } from "../pages/AiAnalyticsPage";

export const aiAnalyticsRoutes: AppRouteConfig[] = [
  {
    path: "/ai-analytics",
    element: <AiAnalyticsPage />,
  },
];
