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
  useMediaQuery,
  useTheme,
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
} from "../../store/documents-api.slice";
import {
  DocumentCreationPayload,
  DocumentType,
} from "../../types/document.types";
import { DocumentProcessing } from "./components/DocumentProcessing";
import { DocumentReview } from "./components/DocumentReview";
import { DocumentUpload } from "./components/DocumentUpload";
import {
  DocumentFields,
  RecognizedData,
  RecognizedValue,
} from "./document-recognition.types";

const steps = ["Upload File", "Processing", "Review & Confirm"];

export const DocumentRecognition = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
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
  ): DocumentFields => {
    const result: DocumentFields = {};

    Object.entries(data).forEach(([key, value]) => {
      const fullKey = parentKey ? `${parentKey}.${key}` : key;

      if (value === null) {
        result[fullKey] = "";
      } else if (typeof value === "object") {
        const nestedFields = flattenRecognizedData(
          value as RecognizedData,
          fullKey
        );
        Object.assign(result, nestedFields);
      } else {
        result[fullKey] = String(value);
      }
    });

    return result;
  };

  const handleConfirm = async () => {
    if (!fileObject || !selectedType) return;

    try {
      // First, prepare the fields array with proper structure
      const fields = flattenRecognizedData(recognizedData);

      const payload: DocumentCreationPayload = {
        file: fileObject,
        type: selectedType.attributes.value,
        title: String(recognizedData.title) || fileObject.name,
        description: recognizedData.description?.toString(),
        fields,
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
    <Container maxWidth="md" sx={{ px: isMobile ? 2 : 3 }}>
      <Paper sx={{ p: isMobile ? 2 : 3, mt: isMobile ? 2 : 3 }}>
        <Typography
          variant={isMobile ? "h6" : "h5"}
          gutterBottom
          sx={{ mb: isMobile ? 2 : 3 }}
        >
          Document Recognition
        </Typography>
        <Stepper
          activeStep={activeStep}
          sx={{
            mb: isMobile ? 3 : 4,
            "& .MuiStepLabel-label": {
              fontSize: isMobile ? "0.875rem" : undefined,
            },
          }}
          orientation={isMobile ? "vertical" : "horizontal"}
        >
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
