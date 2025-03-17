import { Box, Paper, TextField, Typography } from "@mui/material";
import { FieldErrors, RecognizedValue } from "../document-recognition.types";

interface NestedFieldsProps {
  fields: Record<string, RecognizedValue>;
  parentPath?: string;
  isDisabled?: boolean;
  isMobile?: boolean;
  fieldErrors: FieldErrors;
  onFieldChange: (path: string, value: string) => void;
}

export const NestedFields = ({
  fields,
  parentPath = "",
  isDisabled = false,
  isMobile = false,
  fieldErrors,
  onFieldChange,
}: NestedFieldsProps) => {
  const formatFieldName = (name: string) =>
    name.charAt(0).toUpperCase() + name.slice(1).replace(/_/g, " ");

  const renderField = (name: string, value: RecognizedValue, path: string) => {
    if (value === null || value === undefined) {
      return null;
    }

    if (typeof value === "object") {
      return (
        <Box key={path} sx={{ mb: isMobile ? 2 : 3 }}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              p: isMobile ? 1.5 : 2,
              backgroundColor: "grey.50",
            }}
          >
            <Typography
              variant={isMobile ? "subtitle2" : "subtitle1"}
              sx={{
                mb: isMobile ? 1.5 : 2,
                fontWeight: "medium",
              }}
            >
              {formatFieldName(name)}
            </Typography>
            <Box sx={{ pl: isMobile ? 1 : 2 }}>
              {Object.entries(value).map(([childName, childValue]) =>
                renderField(childName, childValue, `${path}.${childName}`)
              )}
            </Box>
          </Paper>
        </Box>
      );
    }

    const error = fieldErrors[path];

    return (
      <TextField
        key={path}
        label={formatFieldName(name)}
        value={String(value)}
        onChange={(e) => onFieldChange(path, e.target.value)}
        disabled={isDisabled}
        fullWidth
        size={isMobile ? "small" : "medium"}
        type={typeof value === "number" ? "number" : "text"}
        multiline={typeof value === "string" && value.length > 100}
        rows={typeof value === "string" && value.length > 100 ? 3 : 1}
        sx={{ mb: isMobile ? 1.5 : 2 }}
        error={!!error}
        helperText={error}
      />
    );
  };

  return (
    <Box>
      {Object.entries(fields).map(([name, value]) =>
        renderField(name, value, parentPath ? `${parentPath}.${name}` : name)
      )}
    </Box>
  );
};
