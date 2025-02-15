import { AppRouteParams } from "@/types/routes.types";
import { useCallback } from "react";
import { useLocation, useNavigate } from "react-router";

export function useTypedNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  const navigateTo = useCallback(
    <T extends keyof AppRouteParams>(
      route: T,
      params?: AppRouteParams[T],
      options?: { replace?: boolean }
    ) => {
      console.log("NAVIGATE TO", route, params, options);
      let path = route as string;
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          path = path.replace(`:${key}`, value.toString());
        });
      }
      navigate(path, { replace: options?.replace });
    },
    [navigate]
  );

  const goBack = useCallback(() => {
    navigate(-1);
  }, [navigate]);

  return {
    navigateTo,
    goBack,
    currentPath: location.pathname,
  };
}
