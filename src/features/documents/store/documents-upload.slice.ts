import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  DocumentFields,
  DocumentRecognitionResponse,
  DocumentType,
} from "../types/document.types";

interface SerializableFileInfo {
  name: string;
  size: number;
  type: string;
  lastModified: number;
}

interface DocumentUploadState {
  fileInfo: SerializableFileInfo | null;
  isUploading: boolean;
  isRecognizing: boolean;
  isCreating: boolean;
  error: string | null;
  recognitionData: {
    documentType: DocumentType | null;
    fields: DocumentFields;
  };
  uploadProgress: number;
}

const initialState: DocumentUploadState = {
  fileInfo: null,
  isUploading: false,
  isRecognizing: false,
  isCreating: false,
  error: null,
  recognitionData: {
    documentType: null,
    fields: {},
  },
  uploadProgress: 0,
};

export interface DocumentCreationPayload {
  file: File;
  type: DocumentType["attributes"]["value"];
  title: string;
  description?: string;
  fields: DocumentFields;
}

export const documentsUploadSlice = createSlice({
  name: "documentsUpload",
  initialState,
  reducers: {
    setFile: (state, action: PayloadAction<File | null>) => {
      if (action.payload) {
        state.fileInfo = {
          name: action.payload.name,
          size: action.payload.size,
          type: action.payload.type,
          lastModified: action.payload.lastModified,
        };
      } else {
        state.fileInfo = null;
      }
      // Reset states when new file is set
      state.recognitionData = initialState.recognitionData;
      state.error = null;
      state.uploadProgress = 0;
    },
    setUploadProgress: (state, action: PayloadAction<number>) => {
      state.uploadProgress = action.payload;
    },
    setIsUploading: (state, action: PayloadAction<boolean>) => {
      state.isUploading = action.payload;
    },
    setIsRecognizing: (state, action: PayloadAction<boolean>) => {
      state.isRecognizing = action.payload;
    },
    setIsCreating: (state, action: PayloadAction<boolean>) => {
      state.isCreating = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setRecognitionData: (
      state,
      action: PayloadAction<DocumentRecognitionResponse>
    ) => {
      state.recognitionData.documentType = action.payload.document_type;
      // Convert extracted data to fields dictionary
      const fields: DocumentFields = {};
      Object.entries(action.payload.extracted_data).forEach(([name, value]) => {
        fields[name] = String(value);
      });
      state.recognitionData.fields = fields;
    },
    updateField: (
      state,
      action: PayloadAction<{ key: string; value: string }>
    ) => {
      state.recognitionData.fields[action.payload.key] = action.payload.value;
    },
    resetState: () => initialState,
  },
});

export const {
  setFile,
  setUploadProgress,
  setIsUploading,
  setIsRecognizing,
  setIsCreating,
  setError,
  setRecognitionData,
  updateField,
  resetState,
} = documentsUploadSlice.actions;

export default documentsUploadSlice.reducer;
