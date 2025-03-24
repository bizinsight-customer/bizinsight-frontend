import { useLocation } from "react-router";

const routeTitles: Record<string, string> = {
  "/": "Dashboard",
  "/dashboard": "Dashboard",
  "/dashboard/chart": "Chart Details",
  "/documents": "Documents",
  "/documents/history": "Documents Upload History",
  "/analytics": "Analytics",
  "/settings": "Settings",
  "/profile": "Profile",
  "/user-settings": "User Settings",
  "/auth": "Authentication",
  "/auth/sign-in": "Sign In",
  "/auth/sign-up": "Sign Up",
};

export const usePageTitle = (): string => {
  const { pathname } = useLocation();

  // First try exact match
  if (pathname in routeTitles) {
    return routeTitles[pathname];
  }

  // Then try matching parent routes
  const pathParts = pathname.split("/").filter(Boolean);
  while (pathParts.length > 0) {
    const parentPath = "/" + pathParts.join("/");
    if (parentPath in routeTitles) {
      return routeTitles[parentPath];
    }
    pathParts.pop();
  }

  return "BizInsight";
};
