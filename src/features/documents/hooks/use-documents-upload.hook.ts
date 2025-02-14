import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store";
import { documentService } from "../services/document.service";
import {
  resetState,
  setError,
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
  const [fileObject, setFileObject] = useState<File | null>(null);
  const {
    fileInfo,
    isUploading,
    isRecognizing,
    isCreating,
    error,
    recognitionData,
    uploadProgress,
  } = useSelector((state: RootState) => state.documentsUpload);

  const handleFileSelect = useCallback((file: File | null) => {
    setFileObject(file);
  }, []);

  const recognizeDocument = useCallback(async () => {
    if (!fileObject) return;

    try {
      dispatch(setIsRecognizing(true));
      dispatch(setError(null));
      const response = await documentService.recognizeDocument(fileObject);
      dispatch(setRecognitionData(response.data));
    } catch (error) {
      dispatch(setError((error as Error).message));
    } finally {
      dispatch(setIsRecognizing(false));
    }
  }, [dispatch, fileObject]);

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
        setFileObject(null);
      } catch (error) {
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setIsCreating(false));
      }
    },
    [dispatch]
  );

  const reset = useCallback(() => {
    setFileObject(null);
    dispatch(resetState());
  }, [dispatch]);

  return {
    // State
    file: fileObject,
    fileInfo,
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
