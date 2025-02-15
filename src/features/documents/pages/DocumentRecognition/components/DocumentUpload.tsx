import { CloudUpload as UploadIcon } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { useDropzone } from "react-dropzone";

interface DocumentUploadProps {
  onFileSelect: (file: File) => void;
}

export const DocumentUpload = ({ onFileSelect }: DocumentUploadProps) => {
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileSelect(acceptedFiles[0]);
      }
    },
    accept: {
      "application/pdf": [".pdf"],
      "image/*": [".png", ".jpg", ".jpeg"],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
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
};
