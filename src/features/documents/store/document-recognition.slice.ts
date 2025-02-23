import { API_ENDPOINTS } from "@/config/api";
import { createApiSlice } from "@/store/create-api-slice";
import { unflattenObject } from "@/utils/object.utils";
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

export const { useRecognizeDocumentMutation, useCreateDocumentMutation } =
  documentRecognitionApi;
