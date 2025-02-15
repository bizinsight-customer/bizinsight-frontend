import { useErrorBoundary } from "react-error-boundary";

let handleError: ((error: Error) => void) | null = null;

// eslint-disable-next-line react-refresh/only-export-components
export const globalHandleError = (error: Error) => {
  if (handleError) {
    handleError(error);
  } else {
    console.error("No error handler set");
    console.error(error);
  }
};

export const GlobalErrorHandler = () => {
  const { showBoundary } = useErrorBoundary();

  handleError = showBoundary;

  return null;
};
