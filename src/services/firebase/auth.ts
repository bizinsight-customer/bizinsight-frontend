import { getAuth, User } from "firebase/auth";
import firebaseApp from "./firebase";

const auth = getAuth(firebaseApp);

export const getUserData = async (user: User) => {
  const idTokenResult = await user.getIdTokenResult();
  const { claims } = idTokenResult;

  return claims;
};

export const getCurrentUserToken = async (): Promise<string | null> => {
  try {
    const currentUser = auth.currentUser;
    if (!currentUser) {
      return null;
    }
    return await currentUser.getIdToken();
  } catch (error) {
    console.error("Error getting user token:", error);
    return null;
  }
};

export { auth };
