import {
  auth,
  getCurrentUserToken,
  getUserData,
  reauthenticateUser,
} from "@/services/firebase/auth";
import { User } from "firebase/auth";
import { useCallback, useEffect, useState } from "react";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";

interface UserClaims {
  // Add specific claim types that your application uses
  role?: string;
  permissions?: string[];
  [key: string]: string | string[] | undefined;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(auth.currentUser);
  const [claims, setClaims] = useState<UserClaims | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const [signInWithEmailAndPassword, , signInLoading, signInError] =
    useSignInWithEmailAndPassword(auth);

  const [createUserWithEmailAndPassword, , signUpLoading, signUpError] =
    useCreateUserWithEmailAndPassword(auth);

  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  // Update loading and error states
  useEffect(() => {
    setLoading(signInLoading || signUpLoading || signOutLoading);
  }, [signInLoading, signUpLoading, signOutLoading]);

  useEffect(() => {
    setError(signInError || signUpError || signOutError || null);
  }, [signInError, signUpError, signOutError]);

  // Update user state when Firebase auth state changes
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      setUser(firebaseUser);
      if (firebaseUser) {
        try {
          const userClaims = await getUserData(firebaseUser);
          setClaims(userClaims as UserClaims);
        } catch (err) {
          console.error("Error fetching user claims:", err);
          setClaims(null);
        }
      } else {
        setClaims(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSignIn = useCallback(
    async (email: string, password: string) => {
      try {
        const result = await signInWithEmailAndPassword(email, password);
        if (result?.user) {
          await getCurrentUserToken();
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

  const handleReauthenticate = useCallback(
    async (email: string, password: string) => {
      return await reauthenticateUser(email, password);
    },
    []
  );

  return {
    user,
    claims,
    isAuthenticated: !!user,
    isLoading: loading,
    error,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    reauthenticate: handleReauthenticate,
  };
};
