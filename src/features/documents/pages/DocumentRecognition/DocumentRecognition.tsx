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
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { get, set } from "lodash";
import { useCallback, useState } from "react";
import { useNavigate } from "react-router";
import { useDocumentTypes } from "../../hooks/use-document-types.hook";
import {
  useCreateDocumentMutation,
  useRecognizeDocumentMutation,
} from "../../store/document-recognition.slice";
import {
  DocumentCreationPayload,
  DocumentField,
  DocumentType,
  RecognizedData,
  RecognizedValue,
} from "../../types/document.types";
import { DocumentProcessing } from "./components/DocumentProcessing";
import { DocumentReview } from "./components/DocumentReview";
import { DocumentUpload } from "./components/DocumentUpload";

const steps = ["Upload File", "Processing", "Review & Confirm"];

export const DocumentRecognition = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [isSuccess, setIsSuccess] = useState(false);
  const [createdDocumentId, setCreatedDocumentId] = useState<string>();
  const [fileObject, setFileObject] = useState<File | null>(null);
  const [recognizedData, setRecognizedData] = useState<RecognizedData>({});

  const [recognizeDocument, { isLoading: isRecognizing }] =
    useRecognizeDocumentMutation();
  const [createDocument, { isLoading: isCreating }] =
    useCreateDocumentMutation();

  const {
    documentTypes,
    isLoading: isLoadingTypes,
    error: documentTypesError,
  } = useDocumentTypes();

  const [selectedType, setSelectedType] = useState<DocumentType | null>(null);

  const getErrorMessage = (
    error: FetchBaseQueryError | SerializedError | null
  ) => {
    if (!error) return null;
    if ("message" in error) return error.message;
    if ("error" in error) return error.error;
    return "An error occurred";
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    const selectedValue = event.target.value;
    const newType = documentTypes?.find(
      (type) => type.attributes.value === selectedValue
    );
    setSelectedType(newType || null);
  };

  const handleFieldChange = (path: string, value: string) => {
    setRecognizedData((prevData) => {
      const newData = { ...prevData };
      const currentValue = get(newData, path);
      let newValue: RecognizedValue = value;

      if (typeof currentValue === "number") {
        const parsed = Number(value);
        if (!isNaN(parsed)) {
          newValue = parsed;
        }
      }

      set(newData, path, newValue);
      return newData;
    });
  };

  const flattenRecognizedData = (
    data: RecognizedData,
    parentKey = ""
  ): DocumentField[] => {
    return Object.entries(data).flatMap(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (value !== null && typeof value === "object") {
        return flattenRecognizedData(
          value as Record<string, RecognizedValue>,
          fullKey
        );
      }

      return [
        {
          name: fullKey,
          value: String(value),
          type:
            typeof value === "string" && value.length > 100 ? "text" : "string",
        },
      ];
    });
  };

  const handleConfirm = async () => {
    if (!fileObject || !selectedType) return;

    try {
      const payload: DocumentCreationPayload = {
        file: fileObject,
        type: selectedType.attributes.value,
        title: String(recognizedData.title) || "Untitled Document",
        description: recognizedData.description?.toString(),
        fields: flattenRecognizedData(recognizedData),
      };

      const response = await createDocument(payload).unwrap();
      setCreatedDocumentId(response.id);
      setIsSuccess(true);
    } catch (err) {
      console.error("Error creating document:", err);
    }
  };

  const handleCancel = () => {
    setFileObject(null);
    setRecognizedData({});
    setSelectedType(null);
    navigate(-1);
  };

  const handleUpload = useCallback(
    async (file: File) => {
      setFileObject(file);
      setActiveStep(1);
      try {
        const response = await recognizeDocument(file).unwrap();
        setSelectedType(response.document_type);
        setRecognizedData(response.extracted_data);
        setActiveStep(2);
      } catch (err) {
        console.error("Error recognizing document:", err);
        setActiveStep(0);
      }
    },
    [recognizeDocument]
  );

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <DocumentUpload onFileSelect={handleUpload} />;
      case 1:
        return (
          <DocumentProcessing
            isUploading={isRecognizing}
            uploadProgress={0}
            fileName={fileObject?.name || ""}
          />
        );
      case 2:
        return (
          <DocumentReview
            error={getErrorMessage(
              documentTypesError as FetchBaseQueryError | SerializedError
            )}
            fields={recognizedData}
            selectedType={selectedType}
            documentTypes={documentTypes || []}
            isUploading={isCreating}
            onTypeChange={handleTypeChange}
            onFieldChange={handleFieldChange}
            onCancel={handleCancel}
            onConfirm={handleConfirm}
            isSuccess={isSuccess}
            createdDocumentId={createdDocumentId}
          />
        );
      default:
        return null;
    }
  };

  if (isLoadingTypes) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h5" gutterBottom>
          Document Recognition
        </Typography>
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
