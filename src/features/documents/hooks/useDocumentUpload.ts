import { useStore } from "@/store/store";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { documentService } from "../services/documentService";
import { ExtractedData } from "../store/documents-slice.types";

export const useDocumentUpload = () => {
  const navigate = useNavigate();
  const {
    file,
    extractedData,
    isProcessing,
    uploadError,
    setFile,
    setProcessing,
    setExtractedData,
    setUploadError,
    updateExtractedData,
    updateField,
    reset,
  } = useStore((state) => ({
    // State
    file: state.documentsSlice.documentUpload.file,
    extractedData: state.documentsSlice.documentUpload.extractedData,
    isProcessing: state.documentsSlice.documentUpload.isProcessing,
    uploadError: state.documentsSlice.documentUpload.uploadError,
    // Actions
    setFile: state.documentsSlice.documentUpload.setFile,
    setProcessing: state.documentsSlice.documentUpload.setProcessing,
    setExtractedData: state.documentsSlice.documentUpload.setExtractedData,
    setUploadError: state.documentsSlice.documentUpload.setUploadError,
    updateExtractedData:
      state.documentsSlice.documentUpload.updateExtractedData,
    updateField: state.documentsSlice.documentUpload.updateField,
    reset: state.documentsSlice.documentUpload.reset,
  }));

  const uploadDocument = useCallback(
    async (file: File) => {
      try {
        setFile(file);
        setProcessing(true);
        setUploadError(null);

        // Process document using the recognizeDocument endpoint
        const response = await documentService.recognizeDocument(file);
        const recognitionData = response.data;

        // Convert DocumentRecognitionResponse to ExtractedData
        const extractedData: ExtractedData = {
          type: recognitionData.document_type,
          title: recognitionData.extracted_data.description || undefined,
          description: recognitionData.extracted_data.description,
          fields: Object.entries(recognitionData.extracted_data).map(
            ([key, value]) => ({
              name: key,
              type: typeof value,
              value: String(value),
            })
          ),
        };

        setExtractedData(extractedData);
      } catch (error) {
        setUploadError(
          error instanceof Error ? error.message : "Failed to process document"
        );
        throw error;
      } finally {
        setProcessing(false);
      }
    },
    [setFile, setProcessing, setExtractedData, setUploadError]
  );

  const confirmUpload = useCallback(async () => {
    if (!file || !extractedData) {
      throw new Error("No file or extracted data available");
    }

    try {
      setProcessing(true);
      setUploadError(null);

      // Create the document with the final data
      const response = await documentService.createDocument({
        file,
        type: extractedData.type,
        title: extractedData.title || "Untitled Document",
        description: extractedData.description,
        fields: extractedData.fields || [],
      });

      // Reset the upload state
      reset();

      // Navigate to the document details page
      navigate(`/documents/${response.data.id}`);

      return response.data.id;
    } catch (error) {
      setUploadError(
        error instanceof Error ? error.message : "Failed to create document"
      );
      throw error;
    } finally {
      setProcessing(false);
    }
  }, [file, extractedData, setProcessing, setUploadError, reset, navigate]);

  return {
    // State
    file,
    extractedData,
    isProcessing,
    uploadError,
    // Actions
    uploadDocument,
    confirmUpload,
    updateExtractedData,
    updateField,
    reset,
  };
};
