import { useErrorPopup } from "@/hooks/useErrorPopup";
import {
  Add as AddIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import {
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
import { useGetDocumentsQuery } from "../store/documents-api.slice";
import { getStatusColor } from "../utils/document-status.utils";

export const DocumentsList = () => {
  const navigate = useNavigate();
  const { data: documents, isLoading, error } = useGetDocumentsQuery({});
  const { showError } = useErrorPopup();

  useEffect(() => {
    if (error) {
      showError("error" in error ? error.error : "Failed to fetch documents");
    }
  }, [error, showError]);

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

  return (
    <Box p={3}>
      <Box display="flex" justifyContent="space-between" mb={3}>
        <Typography variant="h4" component="h1">
          Documents
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/documents/new")}
        >
          Upload Document
        </Button>
      </Box>

      <Grid container spacing={3}>
        {documents?.map((document) => (
          <Grid item xs={12} sm={6} md={4} key={document.id}>
            <Card
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/documents/${document.id}`)}
            >
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <DescriptionIcon sx={{ mr: 1 }} />
                  <Typography variant="h6" component="div">
                    {document.title}
                  </Typography>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {document.description || "No description"}
                </Typography>
                <Box display="flex" justifyContent="space-between" mt={2}>
                  <Chip
                    label={document.type}
                    size="small"
                    color={getStatusColor(document.status)}
                  />
                  <Typography variant="body2" color="textSecondary">
                    {formatFileSize(document.size)}
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
