import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { PaginatedResponse, PaginationParams } from "@/types/api-updated.types";
import { Document } from "../types/document.types";

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
  }),
});

export const { useGetDocumentsQuery } = documentsUpdatedApi;
