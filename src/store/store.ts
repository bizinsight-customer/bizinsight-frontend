import { documentTypesApi } from "@/features/documents/store/document-types.slice";
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import authReducer from "../features/auth/store/auth.slice";
import documentsListReducer from "../features/documents/store/documents-list.slice";
import documentsUploadReducer from "../features/documents/store/documents-upload.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    documentsList: documentsListReducer,
    documentsUpload: documentsUploadReducer,
    [documentTypesApi.reducerPath]: documentTypesApi.reducer,
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
    }).concat(documentTypesApi.middleware),
});

setupListeners(store.dispatch);

// Infer the `RootState` and `AppDispatch`
