import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SerializableUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  metadata: {
    creationTime?: string;
    lastSignInTime?: string;
  };
}

interface AuthState {
  user: SerializableUser | null;
  isLoading: {
    signIn: boolean;
    signUp: boolean;
    signOut: boolean;
  };
  error: {
    signIn: Error | null;
    signUp: Error | null;
    signOut: Error | null;
  };
  isAuthenticated: boolean;
  isInitialized: boolean;
}

const initialState: AuthState = {
  user: null,
  isLoading: {
    signIn: false,
    signUp: false,
    signOut: false,
  },
  error: {
    signIn: null,
    signUp: null,
    signOut: null,
  },
  isAuthenticated: false,
  isInitialized: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<SerializableUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.isInitialized = action.payload;
    },
    setSignInLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading.signIn = action.payload;
    },
    setSignUpLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading.signUp = action.payload;
    },
    setSignOutLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading.signOut = action.payload;
    },
    setSignInError: (state, action: PayloadAction<Error | null>) => {
      state.error.signIn = action.payload;
    },
    setSignUpError: (state, action: PayloadAction<Error | null>) => {
      state.error.signUp = action.payload;
    },
    setSignOutError: (state, action: PayloadAction<Error | null>) => {
      state.error.signOut = action.payload;
    },
    resetAuthState: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.error = {
        signIn: null,
        signUp: null,
        signOut: null,
      };
      state.isLoading = {
        signIn: false,
        signUp: false,
        signOut: false,
      };
    },
  },
});

export const {
  setUser,
  setInitialized,
  setSignInLoading,
  setSignUpLoading,
  setSignOutLoading,
  setSignInError,
  setSignUpError,
  setSignOutError,
  resetAuthState,
} = authSlice.actions;

export default authSlice.reducer;
