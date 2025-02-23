import { getApiErrorMessage } from "@/utils/api-error.utils";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useErrorPopup } from "./useErrorPopup";

export const useApiErrorDisplay = (
  error: unknown | undefined,
  defaultMessage: string = "An error occurred"
) => {
  const { showError } = useErrorPopup();

  const queryError = error as FetchBaseQueryError | SerializedError;

  useEffect(() => {
    if (queryError) {
      showError(getApiErrorMessage(queryError, defaultMessage));
    }
  }, [queryError, defaultMessage, showError]);
};
