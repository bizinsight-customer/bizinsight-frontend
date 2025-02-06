import { API_ENDPOINTS } from "@/config/api";
import api from "@/services/api/axios";
import { DocumentRecognitionResponse } from "../types/document.types";

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
} as const;
