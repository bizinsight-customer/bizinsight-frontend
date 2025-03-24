import { expenseCategoriesApi } from "@/features/dashboard/api-slices/expense-categories.api-slice";
import { facilityApiSlice } from "@/features/dashboard/api-slices/facility.api-slice";
import { marketingApiSlice } from "@/features/dashboard/api-slices/marketing.api-slice";
import { profitApi } from "@/features/dashboard/api-slices/profit.api-slice";
import { revenueApi } from "@/features/dashboard/api-slices/revenue.api-slice";
import { salaryApiSlice } from "@/features/dashboard/api-slices/salary.api-slice";
import { salesApi } from "@/features/dashboard/api-slices/sales.api-slice";
import { stockProcurementApiSlice } from "@/features/dashboard/api-slices/stock-procurement.api-slice";
import { unforeseenExpensesApiSlice } from "@/features/dashboard/api-slices/unforeseen-expenses.api-slice";
import { clientsMetricsApiSlice } from "@/features/dashboard/store/clients-metrics.api-slice";
import { documentTypesApi } from "@/features/documents/store/document-types.slice";
import { documentsApi } from "@/features/documents/store/documents-api.slice";
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

const apiMiddleware = [
  documentTypesApi.middleware,
  documentsApi.middleware,
  documentsUpdatedApi.middleware,
  documentsHistoryApiSlice.middleware,
  userCompanyApiSlice.middleware,
  revenueApi.middleware,
  profitApi.middleware,
  expenseCategoriesApi.middleware,
  userSettingsSlice.middleware,
  globalUserSettingsApiSlice.middleware,
  salesApi.middleware,
  clientsMetricsApiSlice.middleware,
  salaryApiSlice.middleware,
  facilityApiSlice.middleware,
  stockProcurementApiSlice.middleware,
  unforeseenExpensesApiSlice.middleware,
  marketingApiSlice.middleware,
] as Middleware[];

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [documentTypesApi.reducerPath]: documentTypesApi.reducer,
    [documentsApi.reducerPath]: documentsApi.reducer,
    [documentsUpdatedApi.reducerPath]: documentsUpdatedApi.reducer,
    [documentsHistoryApiSlice.reducerPath]: documentsHistoryApiSlice.reducer,
    [userCompanyApiSlice.reducerPath]: userCompanyApiSlice.reducer,
    [revenueApi.reducerPath]: revenueApi.reducer,
    [profitApi.reducerPath]: profitApi.reducer,
    [expenseCategoriesApi.reducerPath]: expenseCategoriesApi.reducer,
    [userSettingsSlice.reducerPath]: userSettingsSlice.reducer,
    [globalUserSettingsApiSlice.reducerPath]:
      globalUserSettingsApiSlice.reducer,
    errorPopup: errorPopupReducer,
    user: userReducer,
    [salesApi.reducerPath]: salesApi.reducer,
    [clientsMetricsApiSlice.reducerPath]: clientsMetricsApiSlice.reducer,
    [salaryApiSlice.reducerPath]: salaryApiSlice.reducer,
    [facilityApiSlice.reducerPath]: facilityApiSlice.reducer,
    [stockProcurementApiSlice.reducerPath]: stockProcurementApiSlice.reducer,
    [unforeseenExpensesApiSlice.reducerPath]:
      unforeseenExpensesApiSlice.reducer,
    [marketingApiSlice.reducerPath]: marketingApiSlice.reducer,
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
