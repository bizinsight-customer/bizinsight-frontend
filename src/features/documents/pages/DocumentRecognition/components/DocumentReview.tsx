import {
  Alert,
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { DocumentField, DocumentType } from "../../../types/document.types";

interface DocumentReviewProps {
  error?: string;
  fields: DocumentField[];
  selectedType: DocumentType | null;
  documentTypes: DocumentType[];
  isUploading: boolean;
  onTypeChange: (event: SelectChangeEvent<string>) => void;
  onFieldChange: (index: number, value: string) => void;
  onCancel: () => void;
  onConfirm: () => void;
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
}: DocumentReviewProps) => {
  const titleField = fields.find((f) => f.name === "title");
  const descriptionField = fields.find((f) => f.name === "description");

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
      <FormControl fullWidth sx={{ mb: 2 }}>
        <TextField
          label="Document Title"
          value={titleField?.value || ""}
          onChange={(e) => {
            const index = fields.findIndex((f) => f.name === "title");
            onFieldChange(index, e.target.value);
          }}
          fullWidth
        />
      </FormControl>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel>Document Type</InputLabel>
        <Select
          value={selectedType || ""}
          label="Document Type"
          onChange={onTypeChange}
        >
          {documentTypes.map((type) => (
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
          value={descriptionField?.value || ""}
          onChange={(e) => {
            const index = fields.findIndex((f) => f.name === "description");
            onFieldChange(index, e.target.value);
          }}
        />
      </FormControl>
      <Box display="flex" justifyContent="flex-end" gap={2} mt={3}>
        <Button onClick={onCancel} disabled={isUploading}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={onConfirm}
          disabled={isUploading || !selectedType || !titleField?.value}
        >
          Confirm & Save
        </Button>
      </Box>
    </Box>
  );
};
