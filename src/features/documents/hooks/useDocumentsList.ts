import { useStore } from "@/store/store";
import { useCallback, useEffect } from "react";
import { documentService } from "../services/documentService";

export const useDocumentsList = () => {
  const { documents, setDocuments, setLoading, setError } = useStore(
    (state) => state.documentsSlice.documentsList
  );

  const fetchDocuments = useCallback(async (): Promise<void> => {
    setLoading(true);
    try {
      const response = await documentService.getDocuments();
      setDocuments(response.data.data);
    } catch (error) {
      setError(
        error instanceof Error ? error.message : "Failed to fetch documents"
      );
    } finally {
      setLoading(false);
    }
  }, [setDocuments, setError, setLoading]);

  useEffect(() => {
    if (!documents.length) {
      fetchDocuments();
    }
  }, [documents.length, fetchDocuments]);

  return {
    documents,
    fetchDocuments,
    isLoading: useStore((state) => state.isLoading),
    error: useStore((state) => state.error),
  };
};
