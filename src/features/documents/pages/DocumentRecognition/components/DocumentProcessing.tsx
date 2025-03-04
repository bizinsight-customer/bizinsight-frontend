import { Box, CircularProgress, Typography } from "@mui/material";

interface DocumentProcessingProps {
  fileName?: string;
}

export const DocumentProcessing = ({ fileName }: DocumentProcessingProps) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Processing your document...
      </Typography>
      <Typography variant="body2" color="textSecondary">
        It can take several minutes
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center", my: 2 }}>
        <CircularProgress />
      </Box>
      {fileName && (
        <Typography variant="body2" color="textSecondary">
          {fileName}
        </Typography>
      )}
    </Box>
  );
};
