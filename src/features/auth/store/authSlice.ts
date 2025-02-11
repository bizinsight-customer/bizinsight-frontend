import { auth } from "@/services/firebase/auth";
import { WithLoadingState } from "@/store/types";
import {
  signOut as firebaseSignOut,
  updateProfile as firebaseUpdateProfile,
} from "firebase/auth";
import { StateCreator } from "zustand";

export interface User {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface AuthState
  extends WithLoadingState<{
    user: User | null;
    isAuthenticated: boolean;
  }> {
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
}

export const createAuthSlice: StateCreator<AuthState> = (set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  setUser: (user: User | null) => {
    set({
      user,
      isAuthenticated: !!user,
      error: null,
    });
  },

  signOut: async () => {
    set({ isLoading: true, error: null });
    try {
      await firebaseSignOut(auth);
      set({
        isLoading: false,
        isAuthenticated: false,
        user: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Sign out failed",
      });
    }
  },

  updateProfile: async (data) => {
    set({ isLoading: true, error: null });
    try {
      if (!auth.currentUser) {
        throw new Error("No user logged in");
      }

      if (data.displayName || data.photoURL) {
        await firebaseUpdateProfile(auth.currentUser, {
          displayName: data.displayName ?? auth.currentUser.displayName,
          photoURL: data.photoURL ?? auth.currentUser.photoURL,
        });
      }

      set((state) => ({
        isLoading: false,
        user: state.user ? { ...state.user, ...data } : null,
      }));
    } catch (error) {
      set({
        isLoading: false,
        error: error instanceof Error ? error.message : "Profile update failed",
      });
    }
  },
});
