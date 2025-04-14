import { aiAnalyticsApiSlice } from "@/features/ai-analytics/store/ai-analytics.api-slice";
import metricApi from "@/features/dashboard/api-slices";
import { documentTypesApi } from "@/features/documents/store/document-types.slice";
import { documentsHistoryApiSlice } from "@/features/documents/store/documents-history.api-slice";
import { documentsUpdatedApi } from "@/features/documents/store/documents-updated.api-slice";
import { userCompanyApiSlice } from "@/features/profile/store/user-company.api-slice";
import { userSettingsSlice } from "@/features/profile/store/user-settings.api-slice";
import { configureStore, Middleware } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import authReducer from "../features/auth/store/auth.slice";
import { globalUserSettingsApiSlice } from "./global-api-slices/global-user-settings.api-slice";
import { errorPopupReducer } from "./global-slices/error-popup.slice";
import { userReducer } from "./global-slices/user/user.slice";

const apiMiddleware = Object.values(metricApi).map(
  (api) => api.apiSlice.middleware
) as Middleware[];
apiMiddleware.push(
  globalUserSettingsApiSlice.middleware,
  userSettingsSlice.middleware,
  documentsHistoryApiSlice.middleware,
  documentsUpdatedApi.middleware,
  userCompanyApiSlice.middleware,
  aiAnalyticsApiSlice.middleware,
  documentTypesApi.middleware
);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [documentTypesApi.reducerPath]: documentTypesApi.reducer,
    [documentsUpdatedApi.reducerPath]: documentsUpdatedApi.reducer,
    [documentsHistoryApiSlice.reducerPath]: documentsHistoryApiSlice.reducer,
    [userCompanyApiSlice.reducerPath]: userCompanyApiSlice.reducer,
    [userSettingsSlice.reducerPath]: userSettingsSlice.reducer,
    [globalUserSettingsApiSlice.reducerPath]:
      globalUserSettingsApiSlice.reducer,
    errorPopup: errorPopupReducer,
    user: userReducer,
    [aiAnalyticsApiSlice.reducerPath]: aiAnalyticsApiSlice.reducer,
    ...Object.fromEntries(
      Object.values(metricApi).map((api) => [
        api.apiSlice.reducerPath,
        api.apiSlice.reducer,
      ])
    ),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types for Firebase integration
        ignoredActions: ["firebase/auth/user"],
        // Ignore these field paths in all actions and state
        ignoredPaths: ["documentsUpload.file", "auth.user"],
      },
    }).concat(apiMiddleware),
  devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch`
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
