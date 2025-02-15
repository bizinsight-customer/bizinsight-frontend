import { useCallback } from "react";
import { showErrorPopup } from "../store/global-slices/error-popup.slice";
import { useAppDispatch } from "../store/store";

export const useErrorPopup = () => {
  const dispatch = useAppDispatch();

  const showError = useCallback(
    (message: string) => {
      dispatch(showErrorPopup(message));
    },
    [dispatch]
  );

  return { showError };
};
