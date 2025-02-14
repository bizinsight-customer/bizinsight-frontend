import { useHandleApiError } from "@/hooks/useHandleApiError";
import { ReactNode, useEffect } from "react";
import api from "./axios";
import { setupInterceptors } from "./interceptors";

interface ApiProviderProps {
  children: ReactNode;
}

export const ApiProvider = ({ children }: ApiProviderProps) => {
  const { handleError } = useHandleApiError();

  useEffect(() => {
    // Set up interceptors with error handling
    setupInterceptors(api, handleError);
  }, [handleError]);

  return <>{children}</>;
};
