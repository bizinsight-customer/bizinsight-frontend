import { API_ENDPOINTS } from "@/config/api";
import { createApiSlice } from "@/store/create-api-slice";
import { JsonApiResource } from "@/types/json-api.types";
import { Document } from "../types/document.types";
export const documentsApi = createApiSlice({
  reducerPath: "documentsApi",
  tagTypes: ["Documents"],
}).injectEndpoints({
  endpoints: (builder) => ({
    getDocuments: builder.query<Document[], { page?: number; limit?: number }>({
      query: ({ page = 1, limit = 10 }) => ({
        url: API_ENDPOINTS.DOCUMENTS.LIST,
        params: { page, limit },
      }),
      providesTags: ["Documents"],
    }),

    getDocument: builder.query<JsonApiResource<Document>, string>({
      query: (id) => ({
        url: API_ENDPOINTS.DOCUMENTS.GET(id),
      }),
      providesTags: (_result, _error, id) => [{ type: "Documents", id }],
    }),
  }),
});

export const { useGetDocumentsQuery, useGetDocumentQuery } = documentsApi;
