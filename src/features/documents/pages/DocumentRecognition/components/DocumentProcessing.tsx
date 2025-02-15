import { Box, LinearProgress, Typography } from "@mui/material";

interface DocumentProcessingProps {
  isUploading: boolean;
  uploadProgress: number;
  fileName?: string;
}

export const DocumentProcessing = ({
  isUploading,
  uploadProgress,
  fileName,
}: DocumentProcessingProps) => {
  return (
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
      {fileName && (
        <Typography variant="body2" color="textSecondary">
          {fileName}
        </Typography>
      )}
    </Box>
  );
};
