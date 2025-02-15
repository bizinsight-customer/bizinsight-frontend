import {
  Box,
  CircularProgress,
  Container,
  Paper,
  SelectChangeEvent,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDocumentTypes } from "../../hooks/use-document-types.hook";
import { useDocumentsUpload } from "../../hooks/use-documents-upload.hook";
import {
  DocumentCreationPayload,
  DocumentField,
  DocumentType,
} from "../../types/document.types";
import { DocumentProcessing } from "./components/DocumentProcessing";
import { DocumentReview } from "./components/DocumentReview";
import { DocumentUpload } from "./components/DocumentUpload";

const steps = ["Upload File", "Processing", "Review & Confirm"];

export const DocumentRecognition = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const {
    fileObject,
    isUploading,
    isRecognizing,
    error,
    recognitionData,
    uploadProgress,
    handleFileSelect,
    recognizeDocument,
    updateFieldValue,
    createDocument,
    reset,
  } = useDocumentsUpload();

  const {
    documentTypes,
    isLoading,
    error: documentTypesError,
  } = useDocumentTypes();

  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);

  useEffect(() => {
    // Reset upload state when component mounts
    console.log("[Document Recognition] Component mounted");
    reset();

    return () => {
      console.log("[Document Recognition] Component unmounted");
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleFileUpload = useCallback(
    async (file: File) => {
      handleFileSelect(file);
      setActiveStep(1);
      await recognizeDocument();
    },
    [handleFileSelect, recognizeDocument]
  );

  useEffect(() => {
    if (recognitionData.documentType && !isRecognizing) {
      setActiveStep(2);
      setSelectedType(recognitionData.documentType);
    }
  }, [recognitionData.documentType, isRecognizing]);

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value);
  };

  const handleFieldChange = (index: number, value: string) => {
    updateFieldValue(index, {
      name: recognitionData.fields[index].name,
      type: "string",
      value,
    });
  };

  const handleConfirm = async () => {
    if (!fileObject || !selectedType) return;

    const titleField = recognitionData.fields.find(
      (field: DocumentField) => field.name === "title"
    );
    const descriptionField = recognitionData.fields.find(
      (field: DocumentField) => field.name === "description"
    );

    const payload: DocumentCreationPayload = {
      file: fileObject,
      type: selectedType,
      title: titleField?.value || fileObject.name,
      description: descriptionField?.value,
      fields: recognitionData.fields,
    };

    try {
      await createDocument(payload);
      navigate("/documents");
    } catch {
      // Error is handled by the hook
    }
  };

  const handleCancel = () => {
    reset();
    setActiveStep(0);
  };

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (documentTypesError) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <Typography color="error">Failed to load document types</Typography>
      </Box>
    );
  }

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <DocumentUpload onFileSelect={handleFileUpload} />;
      case 1:
        return (
          <DocumentProcessing
            isUploading={isUploading}
            uploadProgress={uploadProgress}
            fileName={fileObject?.name}
          />
        );
      case 2:
        return (
          <DocumentReview
            error={error}
            fields={recognitionData.fields}
            selectedType={selectedType}
            documentTypes={documentTypes}
            isUploading={isUploading}
            onTypeChange={handleTypeChange}
            onFieldChange={handleFieldChange}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
          />
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mb: 3 }}>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
      </Paper>
    </Container>
  );
};
