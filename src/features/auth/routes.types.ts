import { RoutePath } from "@/types/routes.base";

export type AuthRouteParams = {
  "auth/signin": undefined;
  "auth/signup": undefined;
  "auth/signup-success": undefined;
};

export type AuthRoutePath = RoutePath<AuthRouteParams>;
