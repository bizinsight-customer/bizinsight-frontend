import {
  Box,
  CircularProgress,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { DocumentProcessing } from "./components/DocumentProcessing";
import { DocumentReview } from "./components/DocumentReview";
import { DocumentUpload } from "./components/DocumentUpload";
import { useDocumentRecognition } from "./hooks/use-document-recognition";
import { getErrorMessage } from "./utils/error-handler";

const steps = ["Upload File", "Processing", "Review & Confirm"];

export const DocumentRecognition = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const {
    activeStep,
    isSuccess,
    createdDocumentId,
    fileObject,
    recognizedData,
    selectedType,
    documentTypes,
    isLoadingTypes,
    isCreating,
    documentTypesError,
    fieldErrors,
    handleTypeChange,
    handleFieldChange,
    handleCreateDocument,
    handleCancel,
    handleUploadToRecognize,
  } = useDocumentRecognition();

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <DocumentUpload onFileSelect={handleUploadToRecognize} />;
      case 1:
        return <DocumentProcessing fileName={fileObject?.name || ""} />;
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
            fieldErrors={fieldErrors}
            onTypeChange={handleTypeChange}
            onFieldChange={handleFieldChange}
            onCancel={handleCancel}
            onConfirm={handleCreateDocument}
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
