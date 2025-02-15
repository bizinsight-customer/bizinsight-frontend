import { useErrorBoundary } from "react-error-boundary";

// @ts-expect-error - This is a global variable that will be set by the useSetGlobalErrorHandler hook
export let globalHandleError: (error: Error) => void = null;

export const GlobalErrorHandler = () => {
  const { showBoundary } = useErrorBoundary();

  globalHandleError = showBoundary;

  return null;
};
