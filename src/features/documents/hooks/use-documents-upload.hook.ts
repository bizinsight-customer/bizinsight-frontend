import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { documentService } from "../services/document.service";
import {
  resetState,
  setError,
  setFile,
  setIsCreating,
  setIsRecognizing,
  setRecognitionData,
  updateField,
} from "../store/documents-upload.slice";
import {
  DocumentCreationPayload,
  DocumentField,
} from "../types/document.types";

export const useDocumentsUpload = () => {
  const dispatch = useDispatch();
  const {
    file,
    isUploading,
    isRecognizing,
    isCreating,
    error,
    recognitionData,
    uploadProgress,
  } = useSelector((state: RootState) => state.documentsUpload);

  const handleFileSelect = useCallback(
    (file: File | null) => {
      dispatch(setFile(file));
    },
    [dispatch]
  );

  const recognizeDocument = useCallback(async () => {
    if (!file) return;

    try {
      dispatch(setIsRecognizing(true));
      dispatch(setError(null));
      const response = await documentService.recognizeDocument(file);
      dispatch(setRecognitionData(response.data));
    } catch (error) {
      dispatch(setError((error as Error).message));
    } finally {
      dispatch(setIsRecognizing(false));
    }
  }, [dispatch, file]);

  const updateFieldValue = useCallback(
    (index: number, field: DocumentField) => {
      dispatch(updateField({ index, field }));
    },
    [dispatch]
  );

  const createDocument = useCallback(
    async (payload: DocumentCreationPayload) => {
      try {
        dispatch(setIsCreating(true));
        dispatch(setError(null));
        await documentService.createDocument(payload);
        dispatch(resetState());
      } catch (error) {
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setIsCreating(false));
      }
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    dispatch(resetState());
  }, [dispatch]);

  return {
    // State
    file,
    isUploading,
    isRecognizing,
    isCreating,
    error,
    recognitionData,
    uploadProgress,
    // Actions
    handleFileSelect,
    recognizeDocument,
    updateFieldValue,
    createDocument,
    reset,
  };
};
