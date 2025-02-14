import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Document, DocumentsResponse } from "../types/document.types";

interface DocumentsListState {
  documents: Document[];
  selectedDocument: Document | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: DocumentsListState = {
  documents: [],
  selectedDocument: null,
  isLoading: false,
  error: null,
};

export const documentsListSlice = createSlice({
  name: "documentsList",
  initialState,
  reducers: {
    setDocuments: (state, action: PayloadAction<DocumentsResponse>) => {
      state.documents = action.payload.data;
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
  },
});

export const { setDocuments, setSelectedDocument, setLoading, setError } =
  documentsListSlice.actions;

export default documentsListSlice.reducer;
