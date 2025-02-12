import { API_ENDPOINTS } from "@/config/api";
import api from "@/services/api/axios";
import {
  Document,
  DocumentCreationPayload,
  DocumentRecognitionResponse,
  DocumentsResponse,
} from "../types/document.types";

export const documentService = {
  /**
   * Upload and recognize a document
   * @param file - The file to be recognized
   * @returns Promise with the recognition results
   */
  recognizeDocument: (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    return api.post<DocumentRecognitionResponse>(
      API_ENDPOINTS.DOCUMENTS.RECOGNIZE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
  },

  /**
   * Create a new document with the final data
   * @param payload - The document creation payload containing file and extracted data
   * @returns Promise with the created document
   */
  createDocument: (payload: DocumentCreationPayload) => {
    const formData = new FormData();
    formData.append("file", payload.file);
    formData.append(
      "data",
      JSON.stringify({
        type: payload.type,
        title: payload.title,
        description: payload.description,
        fields: payload.fields,
      })
    );

    return api.post<Document>(API_ENDPOINTS.DOCUMENTS.CREATE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },

  getDocuments: () => {
    return api.get<DocumentsResponse>("/documents");
  },

  getDocument: (id: string) => {
    return api.get<Document>(`/documents/${id}`);
  },
} as const;
