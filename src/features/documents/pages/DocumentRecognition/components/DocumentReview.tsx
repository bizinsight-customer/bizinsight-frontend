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
import { useNavigate } from "react-router";
import { RecognizedValue } from "../document-recognition.types";
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleSuccessClose = () => {
    if (createdDocumentId) {
      navigate(`/documents/${createdDocumentId}`);
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
      {error && (
        <Alert severity="error" sx={{ mb: isMobile ? 1.5 : 2 }}>
          {error}
        </Alert>
      )}

      <FormControl fullWidth sx={{ mb: isMobile ? 2 : 3 }}>
        <InputLabel>Document Type</InputLabel>
        <Select
          value={selectedType?.value || ""}
          onChange={onTypeChange}
          label="Document Type"
          disabled={isUploading}
          size={isMobile ? "small" : "medium"}
        >
          {documentTypes.map((type) => (
            <MenuItem key={type.value} value={type.value}>
              {type.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <NestedFields
        fields={fields}
        isDisabled={isUploading}
        onFieldChange={onFieldChange}
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
        autoHideDuration={2000}
        onClose={handleSuccessClose}
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
