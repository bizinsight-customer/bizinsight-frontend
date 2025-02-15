import { documentTypesApi } from "@/features/documents/store/document-types.slice";
import { documentsApi } from "@/features/documents/store/documents-api.slice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "../features/auth/store/auth.slice";
import documentsUploadReducer from "../features/documents/store/documents-upload.slice";
import { errorPopupReducer } from "./global-slices/error-popup.slice";
import { userReducer } from "./global-slices/user/user.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    documentsUpload: documentsUploadReducer,
    [documentTypesApi.reducerPath]: documentTypesApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    errorPopup: errorPopupReducer,
    user: userReducer,
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
    }).concat(documentTypesApi.middleware, documentsApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
