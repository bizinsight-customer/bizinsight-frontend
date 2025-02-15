import { useTypedNavigate } from "@/hooks/useTypedNavigate";
import { useUser } from "@/hooks/useUser";
import { auth } from "@/services/firebase/auth";
import { useEffect, useRef } from "react";

const AuthStateChangeHandler = () => {
  const { navigateTo, currentPath } = useTypedNavigate();
  const { updateUser } = useUser();

  const prevCurrentPathRef = useRef(currentPath);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (!user && currentPath !== "/auth/signin") {
        navigateTo("/auth/signin");
      } else if (user && currentPath === "/auth/signin") {
        navigateTo("/dashboard");
      }
      if (prevCurrentPathRef.current !== currentPath) {
        updateUser(user);
        prevCurrentPathRef.current = currentPath;
      }
    });
    return () => unsubscribe();
  }, [navigateTo, currentPath, updateUser]);
  return null;
};

export default AuthStateChangeHandler;
