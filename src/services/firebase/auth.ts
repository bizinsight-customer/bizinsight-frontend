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
    console.log("Attempting to get current user token..."); // Add this log
    let currentUser = auth.currentUser;
    console.log("Current User:", currentUser); // Add this log
    if (!currentUser) {
      console.log("currentUser is null, re-initializing auth..."); // Add this log
      auth = getAuth(app);
      currentUser = auth.currentUser;
      console.log("Current User after re-init:", currentUser); // Add this log
      if (!currentUser) {
        console.log("currentUser is still null after re-init, returning null"); // Add this log
        return null;
      }
    }
    const token = await currentUser.getIdToken();
    console.log("Token retrieved successfully:", token ? "yes" : "no"); // Add this log
    return token;
  } catch (error) {
    console.error("Error getting user token:", error);
    console.error("Error details:", error); // Log the error details
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
