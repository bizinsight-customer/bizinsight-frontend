import { API_ENDPOINTS } from "@/config/api";
import { createApiSlice } from "@/store/create-api-slice";
import {
  Document,
  DocumentCreationPayload,
  DocumentRecognitionResponse,
} from "../types/document.types";

export const documentRecognitionApi = createApiSlice({
  reducerPath: "documentRecognitionApi",
  tagTypes: ["Documents"],
}).injectEndpoints({
  endpoints: (builder) => ({
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
      query: (payload) => ({
        url: API_ENDPOINTS.DOCUMENTS.CREATE,
        method: "POST",
        data: payload,
      }),
      invalidatesTags: ["Documents"],
    }),
  }),
});

export const { useRecognizeDocumentMutation, useCreateDocumentMutation } =
  documentRecognitionApi;
