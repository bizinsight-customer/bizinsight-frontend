import {
  auth,
  getCurrentUserToken,
  getUserData,
} from "@/services/firebase/auth";
import { RootState } from "@/store";
import { useCallback, useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";
import { useDispatch, useSelector } from "react-redux";
import {
  setSignInError,
  setSignInLoading,
  setSignOutError,
  setSignOutLoading,
  setSignUpError,
  setSignUpLoading,
  setUser,
} from "../store/auth.slice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const [firebaseUser, setFirebaseUser] = useState(auth.currentUser);
  const { user, isLoading, error, isAuthenticated } = useSelector(
    (state: RootState) => state.auth
  );

  const [signInWithEmailAndPassword, , signInLoadingState, signInErrorState] =
    useSignInWithEmailAndPassword(auth);

  const [
    createUserWithEmailAndPassword,
    ,
    signUpLoadingState,
    signUpErrorState,
  ] = useCreateUserWithEmailAndPassword(auth);

  const [signOut, signOutLoadingState, signOutErrorState] = useSignOut(auth);

  // Update loading and error states
  useEffect(() => {
    dispatch(setSignInLoading(signInLoadingState));
    dispatch(setSignUpLoading(signUpLoadingState));
    dispatch(setSignOutLoading(signOutLoadingState));
  }, [dispatch, signInLoadingState, signUpLoadingState, signOutLoadingState]);

  useEffect(() => {
    dispatch(setSignInError(signInErrorState || null));
    dispatch(setSignUpError(signUpErrorState || null));
    dispatch(setSignOutError(signOutErrorState || null));
  }, [dispatch, signInErrorState, signUpErrorState, signOutErrorState]);

  // Update user state when Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setFirebaseUser(user);
      if (user) {
        await getUserData(user); // We might want to store claims in the future
        const serializedUser = {
          uid: user.uid,
          email: user.email,
          emailVerified: user.emailVerified,
          displayName: user.displayName,
          photoURL: user.photoURL,
          phoneNumber: user.phoneNumber,
          metadata: {
            creationTime: user.metadata.creationTime,
            lastSignInTime: user.metadata.lastSignInTime,
          },
        };
        dispatch(setUser(serializedUser));
      } else {
        dispatch(setUser(null));
      }
    });

    return () => unsubscribe();
  }, [dispatch]);

  const handleSignIn = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await signInWithEmailAndPassword(email, password);
        if (result?.user) {
          await getCurrentUserToken(); // Token might be used in the future
          return true;
        }
        return false;
      } catch {
        return false;
      }
    },
    [signInWithEmailAndPassword]
  );

  const handleSignUp = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await createUserWithEmailAndPassword(email, password);
        return !!result?.user;
      } catch {
        return false;
      }
    },
    [createUserWithEmailAndPassword]
  );

  const handleSignOut = useCallback(async () => {
    try {
      await signOut();
      return true;
    } catch {
      return false;
    }
  }, [signOut]);

  return {
    // Return both the Firebase user object and the serialized user data
    firebaseUser,
    user,
    isAuthenticated,
    isLoading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
  };
};
