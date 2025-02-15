import { API_ENDPOINTS } from "@/config/api";
import {
  Document,
  DocumentCreationPayload,
  DocumentRecognitionResponse,
} from "@/features/documents/types/document.types";
import api from "@/services/api/axios";
import {
  extractCollectionData,
  extractSingleData,
  getPaginationInfo,
} from "@/services/api/json-api.utils";
import {
  JsonApiCollectionResponse,
  JsonApiEmptyResponse,
  JsonApiSingleResponse,
} from "@/types/json-api.types";

interface GetDocumentsParams {
  page?: number;
  limit?: number;
}

export const documentService = {
  /**
   * Upload and recognize a document
   * @param file - The file to be recognized
   * @returns Promise with the recognition results
   */
  recognizeDocument: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<
      JsonApiSingleResponse<DocumentRecognitionResponse>
    >(API_ENDPOINTS.DOCUMENTS.RECOGNIZE, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return extractSingleData(response);
  },

  /**
   * Create a new document with the final data
   * @param payload - The document creation payload containing file and extracted data
   * @returns Promise with the created document
   */
  createDocument: async (payload: DocumentCreationPayload) => {
    const response = await api.post<JsonApiSingleResponse<Document>>(
      API_ENDPOINTS.DOCUMENTS.CREATE,
      payload
    );
    return extractSingleData(response);
  },

  async getDocuments({ page = 1, limit = 10 }: GetDocumentsParams = {}) {
    const response = await api.get<JsonApiCollectionResponse<Document>>(
      API_ENDPOINTS.DOCUMENTS.LIST,
      {
        params: { page, limit },
      }
    );

    return {
      documents: extractCollectionData(response),
      pagination: getPaginationInfo(response.data.meta),
    };
  },

  async getDocument(id: string) {
    const response = await api.get<JsonApiSingleResponse<Document>>(
      API_ENDPOINTS.DOCUMENTS.GET(id)
    );
    return extractSingleData(response);
  },

  async uploadDocument(file: File) {
    const formData = new FormData();
    formData.append("document", file);

    const response = await api.post<JsonApiSingleResponse<Document>>(
      API_ENDPOINTS.DOCUMENTS.UPLOAD,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    return extractSingleData(response);
  },

  async deleteDocument(id: string) {
    await api.delete<JsonApiEmptyResponse>(API_ENDPOINTS.DOCUMENTS.DELETE(id));
  },
} as const;
