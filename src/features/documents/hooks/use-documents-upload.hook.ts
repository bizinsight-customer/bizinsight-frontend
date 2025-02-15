import { useCallback, useRef, useState } from "react";
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

interface SerializableFileInfo {
  name: string;
  size: number;
  type: string;
}

export const useDocumentsUpload = () => {
  const dispatch = useDispatch();
  const fileObjectRef = useRef<File | null>(null);
  const [fileInfo, setFileInfo] = useState<SerializableFileInfo | null>(null);
  const {
    isUploading,
    isRecognizing,
    isCreating,
    error,
    recognitionData,
    uploadProgress,
  } = useSelector((state: RootState) => state.documentsUpload);

  const handleFileSelect = useCallback((file: File | null) => {
    console.log("[Documents Upload] File selected:", {
      fileName: file?.name,
      fileSize: file?.size,
      fileType: file?.type,
    });
    setFileInfo({
      name: file?.name || "",
      size: file?.size || 0,
      type: file?.type || "",
    });
    fileObjectRef.current = file;
  }, []);

  const recognizeDocument = useCallback(async () => {
    if (!fileObjectRef.current) {
      console.warn(
        "[Documents Upload] Attempted to recognize document without a file"
      );
      return;
    }

    console.log("[Documents Upload] Starting document recognition", {
      fileName: fileObjectRef.current.name,
      fileSize: fileObjectRef.current.size,
    });

    try {
      dispatch(setIsRecognizing(true));
      dispatch(setError(null));
      const response = await documentService.recognizeDocument(
        fileObjectRef.current
      );
      console.log("[Documents Upload] Document recognition successful", {
        recognitionData: response,
      });
      dispatch(setRecognitionData(response));
    } catch (error) {
      console.error("[Documents Upload] Document recognition failed", {
        error: error instanceof Error ? error.message : error,
      });
      dispatch(setError((error as Error).message));
    } finally {
      dispatch(setIsRecognizing(false));
    }
  }, [dispatch]);

  const updateFieldValue = useCallback(
    (index: number, field: DocumentField) => {
      console.log("[Documents Upload] Updating field value", {
        index,
        fieldName: field.name,
        newValue: field.value,
      });
      dispatch(updateField({ index, field }));
    },
    [dispatch]
  );

  const createDocument = useCallback(
    async (payload: DocumentCreationPayload) => {
      console.log("[Documents Upload] Starting document creation", {
        payload,
      });

      try {
        dispatch(setIsCreating(true));
        dispatch(setError(null));
        await documentService.createDocument(payload);
        console.log("[Documents Upload] Document created successfully");
        dispatch(resetState());
        handleFileSelect(null);
      } catch (error) {
        console.error("[Documents Upload] Document creation failed", {
          error: error instanceof Error ? error.message : error,
        });
        dispatch(setError((error as Error).message));
      } finally {
        dispatch(setIsCreating(false));
      }
    },
    [dispatch, handleFileSelect]
  );

  const reset = useCallback(() => {
    console.log("[Documents Upload] Resetting state");
    handleFileSelect(null);
    dispatch(resetState());
  }, [dispatch, handleFileSelect]);

  return {
    // State
    fileObject: fileObjectRef.current,
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
