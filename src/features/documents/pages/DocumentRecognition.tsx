import { CloudUpload as UploadIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  FormControl,
  InputLabel,
  LinearProgress,
  MenuItem,
  Paper,
  Select,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { useNavigate } from "react-router";
import { useDocumentsUpload } from "../hooks/use-documents-upload.hook";
import { DocumentCreationPayload, DocumentType } from "../types/document.types";

const steps = ["Upload File", "Processing", "Review & Confirm"];

export const DocumentRecognition = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const {
    file,
    isUploading,
    isRecognizing,
    isCreating,
    error,
    recognitionData,
    uploadProgress,
    handleFileSelect,
    recognizeDocument,
    updateFieldValue,
    createDocument,
    reset,
  } = useDocumentsUpload();

  useEffect(() => {
    // Reset upload state when component mounts
    reset();
  }, [reset]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        handleFileSelect(acceptedFiles[0]);
        setActiveStep(1);
        await recognizeDocument();
      }
    },
    [handleFileSelect, recognizeDocument]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    multiple: false,
  });

  useEffect(() => {
    if (recognitionData.documentType && !isRecognizing) {
      setActiveStep(2);
    }
  }, [recognitionData.documentType, isRecognizing]);

  const handleConfirm = async () => {
    if (!file || !recognitionData.documentType) return;

    const payload: DocumentCreationPayload = {
      file,
      type: recognitionData.documentType,
      title:
        recognitionData.fields.find((f) => f.name === "title")?.value ||
        file.name,
      description: recognitionData.fields.find((f) => f.name === "description")
        ?.value,
      fields: recognitionData.fields,
    };

    try {
      await createDocument(payload);
      navigate("/documents");
    } catch (error) {
      // Error is handled by the hook
    }
  };

  const renderUploadStep = () => (
    <Box
      {...getRootProps()}
      sx={{
        border: "2px dashed",
        borderColor: isDragActive ? "primary.main" : "grey.300",
        borderRadius: 2,
        p: 3,
        textAlign: "center",
        cursor: "pointer",
        bgcolor: isDragActive ? "action.hover" : "background.paper",
        "&:hover": {
          bgcolor: "action.hover",
        },
      }}
    >
      <input {...getInputProps()} />
      <UploadIcon sx={{ fontSize: 48, color: "primary.main", mb: 2 }} />
      <Typography variant="h6" gutterBottom>
        Drag and drop your document here
      </Typography>
      <Typography color="textSecondary">
        or click to select a file (PDF, PNG, JPG)
      </Typography>
    </Box>
  );

  const renderProcessingStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        {isUploading
          ? "Uploading your document..."
          : "Processing your document..."}
      </Typography>
      {isUploading ? (
        <LinearProgress
          variant="determinate"
          value={uploadProgress}
          sx={{ my: 2 }}
        />
      ) : (
        <LinearProgress sx={{ my: 2 }} />
      )}
      <Typography variant="body2" color="textSecondary">
        {file?.name}
      </Typography>
    </Box>
  );

  const renderReviewStep = () => (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Document Information
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Document Title"
              value={
                recognitionData.fields.find((f) => f.name === "title")?.value ||
                ""
              }
              onChange={(e) =>
                updateFieldValue(
                  recognitionData.fields.findIndex((f) => f.name === "title"),
                  { name: "title", type: "string", value: e.target.value }
                )
              }
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Document Type</InputLabel>
            <Select
              value={recognitionData.documentType || ""}
              label="Document Type"
              onChange={(e) => {
                const type = e.target.value as DocumentType;
                updateFieldValue(
                  recognitionData.fields.findIndex((f) => f.name === "type"),
                  { name: "type", type: "string", value: type }
                );
              }}
            >
              {Object.values(DocumentType).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <TextField
              label="Description"
              multiline
              rows={3}
              value={
                recognitionData.fields.find((f) => f.name === "description")
                  ?.value || ""
              }
              onChange={(e) =>
                updateFieldValue(
                  recognitionData.fields.findIndex(
                    (f) => f.name === "description"
                  ),
                  { name: "description", type: "string", value: e.target.value }
                )
              }
            />
          </FormControl>
        </CardContent>
      </Card>
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="outlined"
          onClick={() => {
            reset();
            setActiveStep(0);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!recognitionData.documentType || isCreating}
        >
          Confirm & Save
        </Button>
      </Box>
    </Box>
  );

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return renderUploadStep();
      case 1:
        return renderProcessingStep();
      case 2:
        return renderReviewStep();
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={0} sx={{ p: 3, mt: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Upload Document
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
