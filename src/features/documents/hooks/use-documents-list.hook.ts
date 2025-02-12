import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { documentService } from "../services/document.service";
import {
  setDocuments,
  setError,
  setLoading,
  setPage,
  setSelectedDocument,
} from "../store/documents-list.slice";

export const useDocumentsList = () => {
  const dispatch = useDispatch();
  const { documents, selectedDocument, isLoading, error, pagination } =
    useSelector((state: RootState) => state.documentsList);

  const fetchDocuments = useCallback(
    async (page: number = 1) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const response = await documentService.getDocuments();
        dispatch(setDocuments(response.data));
        dispatch(setPage(page));
      } catch (error) {
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const fetchDocumentById = useCallback(
    async (id: string) => {
      try {
        dispatch(setLoading(true));
        dispatch(setError(null));
        const response = await documentService.getDocument(id);
        dispatch(setSelectedDocument(response.data));
      } catch (error) {
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch]
  );

  const clearSelectedDocument = useCallback(() => {
    dispatch(setSelectedDocument(null));
  }, [dispatch]);

  return {
    // State
    documents,
    selectedDocument,
    isLoading,
    error,
    pagination,
    // Actions
    fetchDocuments,
    fetchDocumentById,
    clearSelectedDocument,
  };
};
