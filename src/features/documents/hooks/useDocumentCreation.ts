import { useStore } from "@/store/store";
import { useCallback } from "react";
import { documentService } from "../services/documentService";

export const useDocumentCreation = () => {
  const { file, uploadProgress, extractedData, isProcessing, uploadError } =
    useStore((state) => state.documentsSlice.documentUpload);

  const uploadDocument = useCallback(async (file: File) => {
    await documentService.uploadDocument(file);
  }, []);

  return {
    file,
    uploadProgress,
    extractedData,
    isProcessing,
    uploadError,
  };
};
