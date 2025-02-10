import { auth } from "@/services/firebase/auth";
import {
  useCreateUserWithEmailAndPassword,
  useSignInWithEmailAndPassword,
  useSignOut,
} from "react-firebase-hooks/auth";

export const useAuth = () => {
  const [
    signInWithEmailAndPassword,
    userCredential,
    signInLoading,
    signInError,
  ] = useSignInWithEmailAndPassword(auth);
  const [
    createUserWithEmailAndPassword,
    signUpUser,
    signUpLoading,
    signUpError,
  ] = useCreateUserWithEmailAndPassword(auth);
  const [signOut, signOutLoading, signOutError] = useSignOut(auth);

  return {
    signIn: signInWithEmailAndPassword,
    user: userCredential?.user ?? null,
    signInLoading,
    signInError,
    signUp: createUserWithEmailAndPassword,
    signUpUser,
    signUpLoading,
    signUpError,
    signOut,
    signOutLoading,
    signOutError,
  };
};
