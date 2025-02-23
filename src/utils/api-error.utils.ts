import { JsonApiError } from "@/types/json-api.types";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getApiErrorMessage = (
  error: FetchBaseQueryError | SerializedError,
  defaultMessage: string = "An error occurred"
): string => {
  if ("data" in error) {
    const apiError = error.data as { errors?: JsonApiError[] };
    return apiError?.errors?.[0]?.detail || defaultMessage;
  }
  return defaultMessage;
};
