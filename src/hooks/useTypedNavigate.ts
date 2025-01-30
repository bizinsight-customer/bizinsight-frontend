import { AuthRouteParams } from "@/features/auth/routes";
import { useLocation, useNavigate } from "react-router";

// Combine all feature route params
type AppRouteParams = AuthRouteParams;

export function useTypedNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    navigateTo: <T extends keyof AppRouteParams>(
      route: T,
      params?: AppRouteParams[T],
      options?: { replace?: boolean }
    ) => {
      let path = route as string;
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          path = path.replace(`:${key}`, value.toString());
        });
      }
      navigate(path, { replace: options?.replace });
    },

    goBack: () => {
      navigate(-1);
    },

    currentPath: location.pathname,
  };
}
