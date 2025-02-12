import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document, DocumentsResponse } from "../types/document.types";

interface DocumentsListState {
  documents: Document[];
  selectedDocument: Document | null;
  isLoading: boolean;
  error: string | null;
  pagination: {
    total: number;
    page: number;
    perPage: number;
  };
}

const initialState: DocumentsListState = {
  documents: [],
  selectedDocument: null,
  isLoading: false,
  error: null,
  pagination: {
    total: 0,
    page: 1,
    perPage: 10,
  },
};

export const documentsListSlice = createSlice({
  name: "documentsList",
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<DocumentsResponse>) => {
      state.documents = action.payload.data;
      state.pagination = action.payload.meta;
    },
    setSelectedDocument: (state, action: PayloadAction<Document | null>) => {
      state.selectedDocument = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.page = action.payload;
    },
  },
});

export const {
  setDocuments,
  setSelectedDocument,
  setLoading,
  setError,
  setPage,
} = documentsListSlice.actions;

export default documentsListSlice.reducer;
