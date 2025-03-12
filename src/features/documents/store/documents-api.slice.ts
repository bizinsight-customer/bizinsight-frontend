import { API_ENDPOINTS } from "@/config/api";
import { createApiSlice } from "@/store/create-api-slice";
import { JsonApiResource } from "@/types/json-api.types";
import { unflattenObject } from "@/utils/object.utils";
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
    getDocument: builder.query<JsonApiResource<Document>, string>({
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
      invalidatesTags: (_result, _error, id) => [
        { type: "Documents", id },
        "Documents",
      ],
    }),

    recognizeDocument: builder.mutation<DocumentRecognitionResponse, File>({
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

    createDocument: builder.mutation<Document, DocumentCreationPayload>({
      query: (payload) => {
        const formData = new FormData();
        formData.append("file", payload.file);
        formData.append("document_type", payload.type);

        // Transform flattened fields into nested structure
        const nestedFields = unflattenObject(payload.fields);
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
  }),
});

export const {
  useGetDocumentQuery,
  useDeleteDocumentMutation,
  useRecognizeDocumentMutation,
  useCreateDocumentMutation,
} = documentsApi;
