import { API_ENDPOINTS } from "@/config/api";
import { expenseCategoriesApi } from "@/features/dashboard/api-slices/expense-categories.api-slice";
import { facilityApiSlice } from "@/features/dashboard/api-slices/facility.api-slice";
import { marketingApiSlice } from "@/features/dashboard/api-slices/marketing.api-slice";
import { profitApi } from "@/features/dashboard/api-slices/profit.api-slice";
import { revenueApi } from "@/features/dashboard/api-slices/revenue.api-slice";
import { salaryApiSlice } from "@/features/dashboard/api-slices/salary.api-slice";
import { salesApi } from "@/features/dashboard/api-slices/sales.api-slice";
import { stockProcurementApiSlice } from "@/features/dashboard/api-slices/stock-procurement.api-slice";
import { unforeseenExpensesApiSlice } from "@/features/dashboard/api-slices/unforeseen-expenses.api-slice";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { PaginatedResponse, PaginationParams } from "@/types/api-updated.types";
import { JsonApiResponse } from "@/types/json-api.types";
import { unflattenDocumentFields } from "../pages/DocumentRecognition/utils/document-data-transformer";
import {
  Document,
  DocumentCreationPayload,
  DocumentRecognitionResponse,
} from "../types/document.types";

export const documentsUpdatedApi = createApiSliceNonJsonApi({
  reducerPath: "documentsUpdatedApi",
  tagTypes: ["Documents"],
}).injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query<PaginatedResponse<Document>, PaginationParams>({
      query: ({ page = 1, per_page = 10 }) => ({
        url: API_ENDPOINTS.DOCUMENTS.LIST,
        params: { page, per_page },
      }),
      serializeQueryArgs: ({ queryArgs }) => {
        // Only use per_page for cache key to allow merging different pages
        return queryArgs.per_page;
      },
      merge: (currentCache, newItems, { arg }) => {
        // If it's the first page, just return the new items
        if (arg.page === 1) {
          return newItems;
        }
        // Otherwise, merge the new items with the existing ones
        return {
          data: [...currentCache.data, ...newItems.data],
          meta: newItems.meta,
        };
      },
      forceRefetch: ({ currentArg, previousArg }) => {
        // Always refetch if either page or per_page changes
        return (
          currentArg?.page !== previousArg?.page ||
          currentArg?.per_page !== previousArg?.per_page
        );
      },
      providesTags: ["Documents"],
    }),

    createDocument: builder.mutation<
      { data: { id: string } },
      DocumentCreationPayload
    >({
      query: (payload) => {
        const formData = new FormData();
        formData.append("file", payload.file);
        formData.append("document_type", payload.type);

        // Transform flattened fields into nested structure
        const nestedFields = unflattenDocumentFields(payload.fields);
        formData.append("fields", JSON.stringify(nestedFields));

        return {
          url: API_ENDPOINTS.DOCUMENTS.CREATE,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
      invalidatesTags: ["Documents"],
    }),

    downloadDocument: builder.mutation<Blob, string>({
      query: (id) => ({
        url: API_ENDPOINTS.DOCUMENTS.DOWNLOAD(id),
        method: "GET",
        responseType: "blob",
      }),
    }),

    getDocument: builder.query<{ data: Document }, string>({
      query: (id) => ({
        url: API_ENDPOINTS.DOCUMENTS.GET(id),
      }),
      providesTags: (_result, _error, id) => [{ type: "Documents", id }],
    }),

    deleteDocument: builder.mutation<void, string>({
      query: (id) => ({
        url: API_ENDPOINTS.DOCUMENTS.DELETE(id),
        method: "DELETE",
      }),
      async onQueryStarted(id, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          // Invalidate Documents cache
          dispatch(documentsUpdatedApi.util.invalidateTags(["Documents"]));

          // Invalidate all dashboard metrics that might contain document data
          dispatch(marketingApiSlice.util.resetApiState());
          dispatch(unforeseenExpensesApiSlice.util.resetApiState());
          dispatch(expenseCategoriesApi.util.resetApiState());
          dispatch(stockProcurementApiSlice.util.resetApiState());
          dispatch(facilityApiSlice.util.resetApiState());
          dispatch(salaryApiSlice.util.resetApiState());
          dispatch(salesApi.util.resetApiState());
          dispatch(profitApi.util.resetApiState());
          dispatch(revenueApi.util.resetApiState());
        } catch {
          // If the mutation fails, we don't need to invalidate cache
        }
      },
    }),

    recognizeDocument: builder.mutation<
      JsonApiResponse<DocumentRecognitionResponse>,
      File
    >({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: API_ENDPOINTS.DOCUMENTS.RECOGNIZE,
          method: "POST",
          data: formData,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        };
      },
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useCreateDocumentMutation,
  useDownloadDocumentMutation,
  useGetDocumentQuery,
  useDeleteDocumentMutation,
  useRecognizeDocumentMutation,
} = documentsUpdatedApi;
