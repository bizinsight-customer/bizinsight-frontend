import api from "@/services/api/axios";
import { ApiError, ApiResponse } from "@/types/api.types";
import { AxiosError, AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: ApiError) => void;
}

export function useApi<T>(options: UseApiOptions<T> = {}) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(
    async (config: AxiosRequestConfig) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await api.request<ApiResponse<T>>(config);
        setData(response.data.data);
        options.onSuccess?.(response.data.data);
        return response.data.data;
      } catch (err) {
        const apiError = parseApiError(err as AxiosError);
        setError(apiError);
        options.onError?.(apiError);
        throw apiError;
      } finally {
        setIsLoading(false);
      }
    },
    [options]
  );

  return {
    data,
    error,
    isLoading,
    request,
  };
}

const parseApiError = (error: AxiosError): ApiError => {
  if (error.response?.data) {
    return error.response.data as ApiError;
  }
  return {
    message: error.message || "An unexpected error occurred",
    status: error.response?.status,
  };
};
