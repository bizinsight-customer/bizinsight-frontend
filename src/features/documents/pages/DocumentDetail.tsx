import { Download as DownloadIcon } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router";
import { formatFileSize } from "../../../utils/formatters";
import { MetadataField } from "../components/MetadataField";
import { useDocumentsList } from "../hooks/use-documents-list.hook";
import { getStatusColor } from "../utils/document-status.utils";

export const DocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const {
    selectedDocument: document,
    isLoading,
    error,
    fetchDocumentById,
  } = useDocumentsList();

  useEffect(() => {
    if (id) {
      fetchDocumentById(id);
    }
  }, [id, fetchDocumentById]);

  if (isLoading) {
    return (
      <Box m={3}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box m={3}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (!document) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="400px"
      >
        <CircularProgress />
      </Box>
    );
  }

  const handleDownload = () => {
    // In a real application, this would trigger a file download
    // For now, we'll just show an alert
    alert("Downloading file: " + document.title);
  };

  return (
    <Box p={3}>
      <Paper elevation={0} sx={{ mb: 3, p: 3, bgcolor: "background.default" }}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="flex-start"
          mb={2}
        >
          <Box>
            <Typography variant="h4" component="h1" gutterBottom>
              {document.title}
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <Chip label={document.type} />
              <Chip
                label={document.status}
                color={getStatusColor(document.status)}
              />
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<DownloadIcon />}
            onClick={handleDownload}
          >
            Download Original
          </Button>
        </Box>
        {document.description && (
          <Typography color="text.secondary" paragraph>
            {document.description}
          </Typography>
        )}
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Document Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <MetadataField label="Document Type" value={document.type} />
              <MetadataField
                label="Status"
                value={
                  <Chip
                    label={document.status}
                    color={getStatusColor(document.status)}
                    size="small"
                  />
                }
              />
              <MetadataField
                label="File Type"
                value={document.metadata.fileType.toUpperCase()}
              />
              <MetadataField
                label="File Size"
                value={formatFileSize(document.metadata.fileSize)}
              />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Timeline
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <MetadataField
                label="Created At"
                value={new Date(document.createdAt).toLocaleString()}
              />
              <MetadataField
                label="Last Updated"
                value={new Date(document.updatedAt).toLocaleString()}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
