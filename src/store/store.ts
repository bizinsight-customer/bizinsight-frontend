import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "../features/auth/store/auth.slice";
import documentsListReducer from "../features/documents/store/documents-list.slice";
import documentsUploadReducer from "../features/documents/store/documents-upload.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    documentsList: documentsListReducer,
    documentsUpload: documentsUploadReducer,
    // Feature reducers will be added here
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for Firebase integration
        ignoredActions: ["firebase/auth/user"],
        // Ignore these field paths in all actions and state
        ignoredPaths: ["documentsUpload.file", "auth.user"],
      },
    }),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch<AppDispatch>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
