import {
  EmailAuthProvider,
  getAuth,
  reauthenticateWithCredential,
  User,
} from "firebase/auth";
import app from "./firebase";

// Initialize Firebase services
export let auth = getAuth(app);

export const getUserData = async (user: User) => {
  const idTokenResult = await user.getIdTokenResult();
  const { claims } = idTokenResult;
  return claims;
};

export const getCurrentUserToken = async (): Promise<string | null> => {
  try {
    let currentUser = auth.currentUser;
    if (!currentUser) {
      auth = getAuth(app);
      currentUser = auth.currentUser;
      if (!currentUser) {
        return null;
      }
    }
    return await currentUser.getIdToken();
  } catch (error) {
    console.error("Error getting user token:", error);
    return null;
  }
};

export const reauthenticateUser = async (
  email: string,
  password: string
): Promise<boolean> => {
  try {
    const user = auth.currentUser;
    if (!user || !email) {
      return false;
    }

    const credential = EmailAuthProvider.credential(email, password);
    await reauthenticateWithCredential(user, credential);
    return true;
  } catch (error) {
    console.error("Re-authentication failed:", error);
    return false;
  }
};
