import { create } from "zustand";
import { mockDocuments } from "../services/mockDocuments";
import {
  Document,
  DocumentsResponse,
  DocumentStatus,
  DocumentType,
} from "../types/document.types";

interface UploadState {
  file: File | null;
  uploadProgress: number;
  extractedData: Partial<Document> | null;
  isProcessing: boolean;
  uploadError: string | null;
}

interface DocumentsState extends UploadState {
  documents: Document[];
  isLoading: boolean;
  error: string | null;
  currentPage: number;
  totalPages: number;
  fetchDocuments: () => Promise<void>;
  setCurrentPage: (page: number) => void;
  uploadDocument: (file: File) => Promise<void>;
  confirmUpload: () => Promise<void>;
  resetUpload: () => void;
  updateExtractedData: (data: Partial<Document>) => void;
}

export const useDocumentsStore = create<DocumentsState>((set, get) => ({
  documents: [],
  isLoading: false,
  error: null,
  currentPage: 1,
  totalPages: 1,

  file: null,
  uploadProgress: 0,
  extractedData: null,
  isProcessing: false,
  uploadError: null,

  fetchDocuments: async () => {
    set({ isLoading: true });
    try {
      // Simulate API call with mock data
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const response: DocumentsResponse = {
        data: mockDocuments,
        meta: {
          total: mockDocuments.length,
          page: 1,
          perPage: 10,
        },
      };

      set({
        documents: response.data,
        totalPages: Math.ceil(response.meta.total / response.meta.perPage),
        isLoading: false,
        error: null,
      });
    } catch (error) {
      set({
        isLoading: false,
        error: "Failed to fetch documents",
      });
    }
  },

  setCurrentPage: (page: number) => {
    set({ currentPage: page });
  },

  uploadDocument: async (file: File) => {
    set({
      file,
      isProcessing: true,
      uploadError: null,
      uploadProgress: 0,
    });

    try {
      // Simulate file upload and processing
      for (let progress = 0; progress <= 100; progress += 10) {
        await new Promise((resolve) => setTimeout(resolve, 500));
        set({ uploadProgress: progress });
      }

      // Simulate extracted data from backend
      const extractedData: Partial<Document> = {
        title: file.name.split(".")[0],
        type: DocumentType.OTHER,
        status: DocumentStatus.PROCESSING,
        fileSize: file.size,
        fileType: file.name.split(".").pop() || "",
      };

      set({
        isProcessing: false,
        extractedData,
        uploadProgress: 100,
      });
    } catch (error) {
      set({
        isProcessing: false,
        uploadError: "Failed to process document",
      });
    }
  },

  confirmUpload: async () => {
    const { extractedData, file } = get();
    if (!extractedData || !file) return;

    try {
      // Simulate API call to save the document
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const newDocument: Document = {
        id: String(Date.now()),
        title: extractedData.title || file.name,
        type: extractedData.type || DocumentType.OTHER,
        status: DocumentStatus.COMPLETED,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        fileSize: file.size,
        fileType: file.name.split(".").pop() || "",
        description: extractedData.description,
      };

      set((state) => ({
        documents: [...state.documents, newDocument],
        file: null,
        extractedData: null,
        uploadProgress: 0,
      }));

      return newDocument;
    } catch (error) {
      set({ uploadError: "Failed to save document" });
      throw error;
    }
  },

  resetUpload: () => {
    set({
      file: null,
      uploadProgress: 0,
      extractedData: null,
      isProcessing: false,
      uploadError: null,
    });
  },

  updateExtractedData: (data: Partial<Document>) => {
    set((state) => ({
      extractedData: { ...state.extractedData, ...data },
    }));
  },
}));
