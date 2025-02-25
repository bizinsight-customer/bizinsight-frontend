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
  useMediaQuery,
  useTheme,
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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

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
    <Box p={isMobile ? 2 : 3}>
      <Box
        display="flex"
        flexDirection={isMobile ? "column" : "row"}
        alignItems={isMobile ? "stretch" : "center"}
        justifyContent="space-between"
        gap={2}
        mb={2}
      >
        <Typography
          variant={isMobile ? "h5" : "h4"}
          component="h1"
          sx={{
            fontSize: isMobile ? "1.5rem" : undefined,
            textAlign: isMobile ? "center" : "left",
          }}
        >
          Documents
        </Typography>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => navigate("/documents/new")}
          fullWidth={isMobile}
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
          minHeight={isMobile ? "150px" : "200px"}
          bgcolor="background.paper"
          borderRadius={1}
          p={isMobile ? 2 : 3}
        >
          <DescriptionIcon
            sx={{
              fontSize: isMobile ? 36 : 48,
              color: "text.secondary",
              mb: isMobile ? 1 : 2,
            }}
          />
          <Typography
            variant={isMobile ? "subtitle1" : "h6"}
            color="text.secondary"
            gutterBottom
            align="center"
          >
            No Documents Available
          </Typography>
          <Typography
            variant="body2"
            color="text.secondary"
            align="center"
            mb={isMobile ? 1.5 : 2}
            px={2}
          >
            Upload your first document to get started
          </Typography>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={() => navigate("/documents/new")}
            fullWidth={isMobile}
            sx={{ maxWidth: isMobile ? "100%" : "200px" }}
          >
            Upload Document
          </Button>
        </Box>
      ) : (
        <Grid container spacing={isMobile ? 2 : 3}>
          {documents?.map((document: Document) => (
            <Grid item xs={12} sm={6} md={4} key={document.id}>
              <Card
                sx={{
                  cursor: "pointer",
                  height: "100%", // Make all cards the same height
                  display: "flex",
                  flexDirection: "column",
                }}
                onClick={() => navigate(`/documents/${document.id}`)}
              >
                <CardContent
                  sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <Box display="flex" alignItems="center" mb={1.5}>
                    <DescriptionIcon
                      sx={{ mr: 1, fontSize: isMobile ? "1.25rem" : undefined }}
                    />
                    <Typography
                      variant={isMobile ? "subtitle1" : "h6"}
                      component="div"
                      sx={{
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        lineHeight: 1.2,
                        mb: 0,
                      }}
                    >
                      {document.title}
                    </Typography>
                  </Box>
                  <Typography
                    color="textSecondary"
                    variant={isMobile ? "body2" : "body1"}
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: "vertical",
                      mb: 2,
                      flex: 1,
                    }}
                  >
                    {document.description || "No description"}
                  </Typography>
                  <Box display="flex" justifyContent="space-between" mt="auto">
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
        <Box display="flex" justifyContent="center" mt={isMobile ? 2 : 4}>
          <Pagination
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            color="primary"
            size={isMobile ? "small" : "medium"}
          />
        </Box>
      )}
    </Box>
  );
};
