import { AuthTokens, User } from "@/services/auth/authService";
import { clearTokens, setTokens } from "@/services/auth/tokenService";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User, tokens: AuthTokens) => void;
  clearAuth: () => void;
  updateUser: (user: User) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  setAuth: (user, tokens) => {
    setTokens(tokens);
    set({ user, isAuthenticated: true });
  },
  clearAuth: () => {
    clearTokens();
    set({ user: null, isAuthenticated: false });
  },
  updateUser: (user) => {
    set({ user });
  },
}));
