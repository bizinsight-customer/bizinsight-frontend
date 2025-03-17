import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

export const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError | null
): string | null => {
  if (!error) return null;
  if ("message" in error) return error.message;
  if ("error" in error) return error.error;
  return "An error occurred";
};
