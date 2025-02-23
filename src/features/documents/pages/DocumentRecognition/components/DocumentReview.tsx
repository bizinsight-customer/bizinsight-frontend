import {
  DocumentType,
  RecognizedValue,
} from "@/features/documents/types/document.types";
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
} from "@mui/material";
import { useNavigate } from "react-router";
import { NestedFields } from "./NestedFields";

interface DocumentReviewProps {
  error?: string | null;
  fields: Record<string, RecognizedValue>;
  selectedType: DocumentType | null;
  documentTypes: DocumentType[];
  isUploading: boolean;
  onTypeChange: (event: SelectChangeEvent<string>) => void;
  onFieldChange: (path: string, value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
  isSuccess?: boolean;
  createdDocumentId?: string;
}

export const DocumentReview = ({
  error,
  fields,
  selectedType,
  documentTypes,
  isUploading,
  onTypeChange,
  onFieldChange,
  onCancel,
  onConfirm,
  isSuccess,
  createdDocumentId,
}: DocumentReviewProps) => {
  const navigate = useNavigate();

  const handleSuccessClose = () => {
    if (createdDocumentId) {
      navigate(`/documents/${createdDocumentId}`);
    }
  };

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Review Document Information
      </Typography>
      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Document Type</InputLabel>
        <Select
          value={selectedType?.attributes.value || ""}
          onChange={onTypeChange}
          label="Document Type"
          disabled={isUploading}
        >
          {documentTypes.map((type) => (
            <MenuItem key={type.id} value={type.attributes.value}>
              {type.attributes.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <NestedFields
        fields={fields}
        isDisabled={isUploading}
        onFieldChange={onFieldChange}
      />

      <Box sx={{ display: "flex", gap: 2, justifyContent: "flex-end", mt: 3 }}>
        <Button variant="outlined" onClick={onCancel} disabled={isUploading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isUploading || !selectedType}
        >
          {isUploading ? "Creating..." : "Confirm & Save"}
        </Button>
      </Box>

      <Snackbar
        open={isSuccess}
        autoHideDuration={2000}
        onClose={handleSuccessClose}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          Document created successfully!
        </Alert>
      </Snackbar>
    </Box>
  );
};
