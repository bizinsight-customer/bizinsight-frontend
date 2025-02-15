import { useTypedNavigate } from "@/hooks/useTypedNavigate";
import { auth } from "@/services/firebase/auth";
import { useEffect } from "react";

const AuthStateChangeHandler = () => {
  const navigate = useTypedNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        navigate.navigateTo("/dashboard");
      } else {
        navigate.navigateTo("/auth/signin");
      }
    });
    return () => unsubscribe();
  }, [navigate]);
  return null;
};

export default AuthStateChangeHandler;
