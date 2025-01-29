import { useLocation, useNavigate } from "react-router";
import { createPath } from "../config/routes";
import { RouteParams } from "../types/routes.types";

export function useTypedNavigate() {
  const navigate = useNavigate();
  const location = useLocation();

  return {
    navigateTo: <T extends keyof RouteParams>(
      route: T,
      params?: RouteParams[T],
      options?: { replace?: boolean }
    ) => {
      const path = createPath(route, params);
      navigate(path, { replace: options?.replace });
    },

    goBack: () => {
      navigate(-1);
    },

    currentPath: location.pathname,
  };
}
