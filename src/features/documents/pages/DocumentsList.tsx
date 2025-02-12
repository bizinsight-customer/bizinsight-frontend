import {
  Add as AddIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Grid,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { formatFileSize } from "../../../utils/formatters";
import { useDocumentsList } from "../hooks/use-documents-list.hook";
import { getStatusColor } from "../utils/document-status.utils";

export const DocumentsList = () => {
  const navigate = useNavigate();
  const { documents, isLoading, error, fetchDocuments } = useDocumentsList();

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  if (isLoading) {
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

  if (error) {
    return (
      <Box m={2}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  return (
    <Box p={3}>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <Typography variant="h4" component="h1">
          Documents
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/documents/upload")}
        >
          Add Document
        </Button>
      </Box>

      <Grid container spacing={3}>
        {documents.map((document) => (
          <Grid item xs={12} sm={6} md={4} key={document.id}>
            <Card
              sx={{
                height: "100%",
                cursor: "pointer",
                "&:hover": {
                  boxShadow: 6,
                },
              }}
              onClick={() => navigate(`/documents/${document.id}`)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <DescriptionIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="h6" component="div" noWrap>
                    {document.title}
                  </Typography>
                </Box>

                <Box mb={2}>
                  <Chip label={document.type} size="small" sx={{ mr: 1 }} />
                  <Chip
                    label={document.status}
                    color={getStatusColor(document.status)}
                    size="small"
                  />
                </Box>

                {document.description && (
                  <Typography
                    color="text.secondary"
                    sx={{
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }}
                  >
                    {document.description}
                  </Typography>
                )}

                <Box display="flex" justifyContent="space-between">
                  <Typography variant="body2" color="text.secondary">
                    {formatFileSize(document.metadata.fileSize)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {new Date(document.createdAt).toLocaleDateString()}
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
