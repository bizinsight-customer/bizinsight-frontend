import { useErrorBoundary } from "react-error-boundary";

export const useHandleApiError = () => {
  const { showBoundary } = useErrorBoundary();

  const handleError = (error: Error) => {
    showBoundary(error);
  };

  return { handleError };
};
