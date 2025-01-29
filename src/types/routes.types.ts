export type RouteParams = {
  // Auth routes
  "auth/signin": undefined;
  "auth/signup": undefined;
  "auth/signup-success": undefined;

  // Main routes
  dashboard: undefined;
  reports: undefined;

  // Dynamic routes examples
  "reports/detail": {
    reportId: string;
  };
  "user/profile": {
    userId: string;
  };
};

export type RoutePath = {
  [K in keyof RouteParams]: RouteParams[K] extends undefined
    ? `/${K}`
    : `/${K}/${Extract<keyof RouteParams[K], string>}`;
};

export type RouteKey = keyof RouteParams;
