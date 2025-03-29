import { ErrorMessage } from "@/components/common/ErrorMessage";
import { DocumentType } from "@/features/documents/types/document.types";
import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Snackbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { RecognizedValue } from "../document-recognition.types";
import { NestedFields } from "./NestedFields";

interface DocumentReviewProps {
  error?: string | null;
  fields: Record<string, RecognizedValue>;
  selectedType: DocumentType | null;
  documentTypes: DocumentType[];
  isUploading: boolean;
  fieldErrors: Record<string, string>;
  onTypeChange: (event: SelectChangeEvent<string>) => void;
  onFieldChange: (path: string, value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  isSuccess?: boolean;
}

export const DocumentReview = ({
  error,
  fields,
  selectedType,
  documentTypes,
  isUploading,
  fieldErrors,
  onTypeChange,
  onFieldChange,
  onCancel,
  onConfirm,
  isSuccess,
}: DocumentReviewProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const errorRef = useRef<HTMLDivElement>(null);
  const prevFieldErrorsRef = useRef<Record<string, string>>({});
  const prevErrorRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    // Check if there are new errors by comparing with previous errors
    const hasNewFieldError =
      fieldErrors["company"] && !prevFieldErrorsRef.current["company"];
    const hasNewError = error && error !== prevErrorRef.current;

    // If there are new errors, scroll to top
    if (hasNewFieldError || hasNewError) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }

    // Update previous error refs
    prevFieldErrorsRef.current = fieldErrors;
    prevErrorRef.current = error;
  }, [fieldErrors, error]);

  const getErrorMessage = (error: string) => {
    try {
      const errorObj = JSON.parse(error);
      if (errorObj.ctx?.code === "DOCUMENT_COMPANY_MISMATCH") {
        return "This document must be associated with your company (either as issuer or recipient). Please check the company details.";
      }
      return errorObj.msg || error;
    } catch {
      return error;
    }
  };

  return (
    <Box>
      <Typography
        variant={isMobile ? "subtitle1" : "h6"}
        gutterBottom
        sx={{ mb: isMobile ? 1.5 : 2 }}
      >
        Review Document Information
      </Typography>
      <Box ref={errorRef}>
        {fieldErrors["company"] ? (
          <ErrorMessage
            message={fieldErrors["company"]}
            sx={{ mb: isMobile ? 1.5 : 2 }}
          />
        ) : (
          error && (
            <ErrorMessage
              message={getErrorMessage(error)}
              sx={{ mb: isMobile ? 1.5 : 2 }}
            />
          )
        )}
      </Box>

      <FormControl fullWidth sx={{ mb: isMobile ? 2 : 3 }}>
        <InputLabel error={!!fieldErrors["type"]}>Document Type</InputLabel>
        <Select
          value={selectedType?.value || ""}
          onChange={onTypeChange}
          label="Document Type"
          disabled={isUploading}
          size={isMobile ? "small" : "medium"}
          error={!!fieldErrors["type"]}
        >
          {documentTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
        {fieldErrors["type"] && (
          <Typography color="error" variant="caption" sx={{ mt: 0.5, ml: 2 }}>
            {fieldErrors["type"]}
          </Typography>
        )}
      </FormControl>

      <NestedFields
        fields={fields}
        isDisabled={isUploading}
        onFieldChange={onFieldChange}
        fieldErrors={fieldErrors}
        isMobile={isMobile}
      />

      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? 1 : 2,
          justifyContent: isMobile ? "stretch" : "flex-end",
          mt: isMobile ? 2 : 3,
        }}
      >
        <Button
          variant="outlined"
          onClick={onCancel}
          disabled={isUploading}
          fullWidth={isMobile}
          size={isMobile ? "large" : "medium"}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isUploading || !selectedType}
          fullWidth={isMobile}
          size={isMobile ? "large" : "medium"}
        >
          {isUploading ? "Creating..." : "Confirm & Save"}
        </Button>
      </Box>

      <Snackbar
        open={isSuccess}
        anchorOrigin={{
          vertical: isMobile ? "bottom" : "top",
          horizontal: "center",
        }}
      >
        <Alert
          severity="success"
          sx={{
            width: "100%",
            boxShadow: theme.shadows[3],
          }}
        >
          Document created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};
