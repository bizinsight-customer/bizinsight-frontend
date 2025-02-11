import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";
import { AuthState, createAuthSlice } from "../features/auth/store/authSlice";

// Define the root store type
export type RootState = AuthState;

// Create the store with all slices
export const useStore = create<RootState>()(
  devtools(
    persist(
      (...a) => ({
        ...createAuthSlice(...a),
      }),
      {
        name: "bizinsight-store",
        // Only persist specific fields
        partialize: (state) => ({
          user: state.user,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);

// Export type-safe hooks for accessing specific slices
export const useAuth = () => useStore();

// Export individual actions and selectors
export const useUser = () => useStore((state) => state.user);
export const useIsAuthenticated = () =>
  useStore((state) => state.isAuthenticated);
export const useAuthLoading = () => useStore((state) => state.isLoading);
export const useAuthError = () => useStore((state) => state.error);
