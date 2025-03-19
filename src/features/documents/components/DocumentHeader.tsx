import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";

interface DocumentHeaderProps {
  documentType: string;
  filePath?: string;
  fileName?: string;
  isMobile: boolean;
  isDeleting: boolean;
  onDownload: () => void;
  onDelete: () => void;
}

export const DocumentHeader = ({
  documentType,
  filePath,
  fileName,
  isMobile,
  isDeleting,
  onDownload,
  onDelete,
}: DocumentHeaderProps) => (
  <Box
    display="flex"
    flexDirection={isMobile ? "column" : "row"}
    justifyContent="space-between"
    alignItems={isMobile ? "stretch" : "flex-start"}
    gap={isMobile ? 2 : 0}
  >
    <Box>
      <Typography
        variant={isMobile ? "h5" : "h4"}
        component="h1"
        fontWeight="bold"
      >
        {documentType}
      </Typography>
    </Box>
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      gap={isMobile ? 1 : 2}
      width={isMobile ? "100%" : "auto"}
    >
      {filePath && (
        <Button
          variant="contained"
          startIcon={<DownloadIcon />}
          onClick={onDownload}
          fullWidth={isMobile}
          size={isMobile ? "large" : "medium"}
        >
          Download Original
        </Button>
      )}
      <Button
        variant="outlined"
        color="error"
        startIcon={<DeleteIcon />}
        onClick={onDelete}
        disabled={isDeleting}
        fullWidth={isMobile}
        size={isMobile ? "large" : "medium"}
      >
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
    </Box>
  </Box>
);
