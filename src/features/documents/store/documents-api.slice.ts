import { API_ENDPOINTS } from "@/config/api";
import { createApiSlice } from "@/store/create-api-slice";
import {
  JsonApiCollectionResponse,
  JsonApiSingleResponse,
} from "@/types/json-api.types";
import {
  Document,
  DocumentCreationPayload,
  DocumentRecognitionResponse,
} from "../types/document.types";

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
      transformResponse: (response: JsonApiCollectionResponse<Document>) =>
        response.data,
      providesTags: ["Documents"],
    }),

    getDocument: builder.query<Document, string>({
      query: (id) => ({
        url: API_ENDPOINTS.DOCUMENTS.GET(id),
      }),
      transformResponse: (response: JsonApiSingleResponse<Document>) =>
        response.data,
      providesTags: (_result, _error, id) => [{ type: "Documents", id }],
    }),

    recognizeDocument: builder.mutation<DocumentRecognitionResponse, File>({
      query: (file) => {
        const formData = new FormData();
        formData.append("file", file);
        return {
          url: API_ENDPOINTS.DOCUMENTS.RECOGNIZE,
          method: "POST",
          data: formData,
        };
      },
      transformResponse: (
        response: JsonApiSingleResponse<DocumentRecognitionResponse>
      ) => response.data,
    }),

    createDocument: builder.mutation<Document, DocumentCreationPayload>({
      query: (payload) => ({
        url: API_ENDPOINTS.DOCUMENTS.CREATE,
        method: "POST",
        data: payload,
      }),
      transformResponse: (response: JsonApiSingleResponse<Document>) =>
        response.data,
      invalidatesTags: ["Documents"],
    }),

    deleteDocument: builder.mutation<void, string>({
      query: (id) => ({
        url: API_ENDPOINTS.DOCUMENTS.DELETE(id),
        method: "DELETE",
      }),
      invalidatesTags: ["Documents"],
    }),
  }),
});

export const {
  useGetDocumentsQuery,
  useGetDocumentQuery,
  useRecognizeDocumentMutation,
  useCreateDocumentMutation,
  useDeleteDocumentMutation,
} = documentsApi;
