import { User as FirebaseUser } from "firebase/auth";
import { useCallback } from "react";
import {
  clearUser,
  selectUser,
  selectUserError,
  selectUserLoading,
  setUser,
  setUserError,
  setUserLoading,
} from "../store/global-slices/user/user.slice";
import {
  SerializedUser,
  serializeUser,
} from "../store/global-slices/user/user.types";
import { useAppDispatch, useAppSelector } from "../store/store";

export const useUser = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const isLoading = useAppSelector(selectUserLoading);
  const error = useAppSelector(selectUserError);

  const updateUser = useCallback(
    (firebaseUser: FirebaseUser | null) => {
      const serializedUser = serializeUser(firebaseUser);
      dispatch(setUser(serializedUser));
    },
    [dispatch]
  );

  const updateUserData = useCallback(
    (userData: Partial<SerializedUser>) => {
      if (!user) return;
      dispatch(setUser({ ...user, ...userData }));
    },
    [dispatch, user]
  );

  const setLoading = useCallback(
    (loading: boolean) => {
      dispatch(setUserLoading(loading));
    },
    [dispatch]
  );

  const setError = useCallback(
    (errorMessage: string | null) => {
      dispatch(setUserError(errorMessage));
    },
    [dispatch]
  );

  const resetUser = useCallback(() => {
    dispatch(clearUser());
  }, [dispatch]);

  return {
    user,
    isLoading,
    error,
    updateUser,
    updateUserData,
    setLoading,
    setError,
    resetUser,
  };
};
