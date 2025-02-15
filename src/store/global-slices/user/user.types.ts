import { User as FirebaseUser } from "firebase/auth";

export interface SerializedUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  phoneNumber: string | null;
  isAnonymous: boolean;
  tenantId: string | null;
  providerData: Array<{
    providerId: string;
    uid: string;
    displayName: string | null;
    email: string | null;
    phoneNumber: string | null;
    photoURL: string | null;
  }>;
  createdAt?: string;
  lastLoginAt?: string;
}

export interface UserState {
  currentUser: SerializedUser | null;
  isLoading: boolean;
  error: string | null;
}

export const serializeUser = (
  firebaseUser: FirebaseUser | null
): SerializedUser | null => {
  if (!firebaseUser) return null;

  return {
    uid: firebaseUser.uid,
    email: firebaseUser.email,
    displayName: firebaseUser.displayName,
    photoURL: firebaseUser.photoURL,
    emailVerified: firebaseUser.emailVerified,
    phoneNumber: firebaseUser.phoneNumber,
    isAnonymous: firebaseUser.isAnonymous,
    tenantId: firebaseUser.tenantId,
    providerData: firebaseUser.providerData.map((provider) => ({
      providerId: provider.providerId,
      uid: provider.uid,
      displayName: provider.displayName,
      email: provider.email,
      phoneNumber: provider.phoneNumber,
      photoURL: provider.photoURL,
    })),
    createdAt: firebaseUser.metadata?.creationTime,
    lastLoginAt: firebaseUser.metadata?.lastSignInTime,
  };
};
