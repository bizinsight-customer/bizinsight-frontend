export const ROUTES_WITH_BACK_BUTTON = ["/dashboard/chart"];

export const hasBackButton = (pathname: string): boolean => {
  return ROUTES_WITH_BACK_BUTTON.includes(pathname);
};
