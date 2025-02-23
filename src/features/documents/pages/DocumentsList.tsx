import { useApiErrorDisplay } from "@/hooks/useApiErrorDisplay";
import { getApiErrorMessage } from "@/utils/api-error.utils";
import {
  Add as AddIcon,
  Description as DescriptionIcon,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import { formatFileSize } from "../../../utils/formatters";
import { useGetDocumentsQuery } from "../store/documents-api.slice";
import { Document } from "../types/document.types";

const ITEMS_PER_PAGE = 10;

export const DocumentsList = () => {
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const {
    data: documents,
    isLoading,
    error,
  } = useGetDocumentsQuery({
    page,
    limit: ITEMS_PER_PAGE,
  });

  useApiErrorDisplay(error, "Failed to fetch documents");

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  if (error) {
    return <div>Error: {getApiErrorMessage(error)}</div>;
  }

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

  // const totalPages = data?.meta?.totalPages || 1;
  const totalPages = 1;

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

      {documents?.length === 0 ? (
        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          minHeight="200px"
          bgcolor="background.paper"
          borderRadius={1}
          p={3}
        >
          <DescriptionIcon
            sx={{ fontSize: 48, color: "text.secondary", mb: 2 }}
          />
          <Typography variant="h6" color="text.secondary" gutterBottom>
            No Documents Available
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mb={2}
          >
            Upload your first document to get started
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
      ) : (
        <Grid container spacing={3}>
          {documents?.map((document: Document) => (
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
                    <Typography variant="body2" color="textSecondary">
                      {formatFileSize(document.size)}
                    </Typography>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {totalPages > 1 && (
        <Box display="flex" justifyContent="center" mt={4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
          />
        </Box>
      )}
    </Box>
  );
};
