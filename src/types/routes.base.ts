// Base type definitions for routes
export type BaseRouteParams = Record<
  string,
  undefined | Record<string, string>
>;

export type RoutePath<T extends BaseRouteParams> = {
  [K in keyof T]: T[K] extends undefined
    ? `/${K}`
    : `/${K}/${Extract<keyof T[K], string>}`;
};
