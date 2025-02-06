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
import { useDocumentsStore } from "../store/documentsStore";
import { DocumentType } from "../types/document.types";

const steps = ["Upload File", "Processing", "Review & Confirm"];

export const DocumentUpload = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const {
    file,
    uploadProgress,
    extractedData,
    isProcessing,
    uploadError,
    uploadDocument,
    confirmUpload,
    resetUpload,
    updateExtractedData,
  } = useDocumentsStore();

  useEffect(() => {
    // Reset upload state when component mounts
    resetUpload();
  }, [resetUpload]);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        await uploadDocument(acceptedFiles[0]);
        setActiveStep(1);
      }
    },
    [uploadDocument]
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
    if (uploadProgress === 100 && !isProcessing) {
      setActiveStep(2);
    }
  }, [uploadProgress, isProcessing]);

  const handleConfirm = async () => {
    try {
      await confirmUpload();
      navigate("/documents");
    } catch (error) {
      // Error is handled by the store
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
        Processing your document...
      </Typography>
      <LinearProgress
        variant="determinate"
        value={uploadProgress}
        sx={{ my: 2 }}
      />
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
      {uploadError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {uploadError}
        </Alert>
      )}
      <Card sx={{ mb: 2 }}>
        <CardContent>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <TextField
              label="Document Title"
              value={extractedData?.title || ""}
              onChange={(e) => updateExtractedData({ title: e.target.value })}
              fullWidth
            />
          </FormControl>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Document Type</InputLabel>
            <Select
              value={extractedData?.type || ""}
              label="Document Type"
              onChange={(e) =>
                updateExtractedData({
                  type: e.target.value as DocumentType,
                })
              }
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
              value={extractedData?.description || ""}
              onChange={(e) =>
                updateExtractedData({
                  description: e.target.value,
                })
              }
            />
          </FormControl>
        </CardContent>
      </Card>
      <Box display="flex" justifyContent="flex-end" gap={2}>
        <Button
          variant="outlined"
          onClick={() => {
            resetUpload();
            setActiveStep(0);
          }}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleConfirm}
          disabled={!extractedData?.title || !extractedData?.type}
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
