import type { RouteObject } from "react-router";

// Base type definitions for routes

// Basic route parameter structure
export type BaseRouteParams = Record<
  string,
  undefined | Record<string, string>
>;

// Utility type to create path strings from route params
export type RoutePath<T extends BaseRouteParams> =
  | {
      [K in keyof T]: T[K] extends undefined
        ? `/${string & K}`
        : `/${string & K}/${Extract<keyof T[K], string>}`;
    }[keyof T]
  | string;

// Utility type to extract route keys
export type RouteKeys<T extends BaseRouteParams> = keyof T;

// Utility type to get params for specific route
export type RouteParams<
  T extends BaseRouteParams,
  K extends keyof T
> = T[K] extends Record<string, string> ? T[K] : never;

// Route configuration type
export type RouteConfig<T extends BaseRouteParams = BaseRouteParams> = Omit<
  RouteObject,
  "path" | "children"
> & {
  path?: RoutePath<T>;
  children?: RouteConfig<T>[];
};
