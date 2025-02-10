import { useAuthStore } from "@/features/auth/store/authSlice";
import { getAuth, User } from "firebase/auth";
import firebaseApp from "./firebase";

const auth = getAuth(firebaseApp);

export const getUserData = async (user: User) => {
  const idTokenResult = await user.getIdTokenResult();
  const { claims } = idTokenResult;
  useAuthStore.getState().setUserData(claims);
};

export { auth };
