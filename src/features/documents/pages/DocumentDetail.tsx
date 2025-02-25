import { ApiErrorDisplay } from "@/components/ApiErrorDisplay";
import { useApiErrorDisplay } from "@/hooks/useApiErrorDisplay";
import { JsonApiResource } from "@/types/json-api.types";
import {
  Delete as DeleteIcon,
  Download as DownloadIcon,
} from "@mui/icons-material";
import {
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
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { DynamicAttributes } from "../components/DynamicAttributes";
import { MetadataField } from "../components/MetadataField";
import {
  useDeleteDocumentMutation,
  useGetDocumentQuery,
} from "../store/documents-api.slice";
import { Document } from "../types/document.types";

const COMMON_ATTRIBUTES = [
  "document_type",
  "status",
  "created_at",
  "updated_at",
  "user_id",
  "issuer_company_id",
  "recipient_company_id",
  "doc_metadata",
  "file_path",
  "file_name",
  "file_type",
] as const;

export const DocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isDeletingRef = useRef(false);
  const isUnmountingRef = useRef(false);
  const isInitialMountRef = useRef(true); // Track initial mount

  const { data, isLoading, error } = useGetDocumentQuery(id ?? "", {
    skip: isUnmountingRef.current && !isInitialMountRef.current, // Skip only after initial mount and when unmounting
  });

  const [deleteDocument, { isLoading: isDeleting }] =
    useDeleteDocumentMutation();
  useApiErrorDisplay(error, "Failed to fetch document");

  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false; // Set initial mount to false after first render
      return; // Skip cleanup on initial mount
    }

    return () => {
      console.log("DocumentDetail component unmounted");
      isUnmountingRef.current = true;
    };
  }, []);

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
    return <ApiErrorDisplay error={error} />;
  }

  if (!data) {
    return (
      <Box p={isMobile ? 2 : 3}>
        <Typography>No document data available</Typography>
      </Box>
    );
  }

  const { attributes } = data as JsonApiResource<Document>;
  const documentData: Record<string, unknown> = {
    ...attributes,
    ...attributes.document_data,
    ...(attributes.metadata || {}),
  };

  const handleDownload = () => {
    if (attributes.file_path) {
      // Implement file download logic
      alert("Downloading file: " + attributes.file_name);
    }
  };

  const handleDelete = async () => {
    if (!id) return;

    try {
      isDeletingRef.current = true;
      console.log("Before deleteDocument call");
      await deleteDocument(id).unwrap();
      console.log("After deleteDocument call, before navigate");
      navigate("/documents");
      console.log("After navigate call");
    } catch (error) {
      // Error will be handled by useApiErrorDisplay
    } finally {
      isDeletingRef.current = false;
    }
  };

  return (
    <Box p={isMobile ? 2 : 3}>
      <Paper
        elevation={0}
        sx={{
          mb: isMobile ? 2 : 3,
          p: isMobile ? 2 : 3,
          bgcolor: "background.default",
        }}
      >
        <Box
          display="flex"
          flexDirection={isMobile ? "column" : "row"}
          justifyContent="space-between"
          alignItems={isMobile ? "stretch" : "flex-start"}
          gap={isMobile ? 2 : 0}
          mb={2}
        >
          <Box>
            <Typography
              variant={isMobile ? "h5" : "h4"}
              component="h1"
              gutterBottom
              sx={{
                wordBreak: "break-word",
                mb: isMobile ? 1 : 2,
              }}
            >
              {attributes.document_type}
            </Typography>
            <Box display="flex" gap={1} mb={isMobile ? 1.5 : 2}>
              <Chip
                label={attributes.document_type}
                size={isMobile ? "small" : "medium"}
              />
            </Box>
          </Box>
          <Box
            display="flex"
            flexDirection={isMobile ? "column" : "row"}
            gap={isMobile ? 1 : 2}
            width={isMobile ? "100%" : "auto"}
          >
            {attributes.file_path && (
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
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
              onClick={handleDelete}
              disabled={isDeleting}
              fullWidth={isMobile}
              size={isMobile ? "large" : "medium"}
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </Box>
        </Box>
        {attributes.description && (
          <Typography
            color="text.secondary"
            paragraph
            variant={isMobile ? "body2" : "body1"}
            sx={{ mb: 0 }}
          >
            {attributes.description}
          </Typography>
        )}
      </Paper>

      <Grid container spacing={isMobile ? 2 : 3}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent sx={{ p: isMobile ? 2 : 3 }}>
              <Typography
                variant={isMobile ? "subtitle1" : "h6"}
                gutterBottom
                sx={{ mb: isMobile ? 1.5 : 2 }}
              >
                Document Information
              </Typography>
              <Divider sx={{ mb: isMobile ? 1.5 : 2 }} />
              <MetadataField
                label="Document Type"
                value={attributes.document_type}
                isMobile={isMobile}
              />
              <MetadataField
                label="Created At"
                value={new Date(attributes.created_at).toLocaleString()}
                isMobile={isMobile}
              />
              <MetadataField
                label="Updated At"
                value={new Date(attributes.updated_at).toLocaleString()}
                isMobile={isMobile}
              />
              <Box mt={isMobile ? 1.5 : 2}>
                <Typography
                  variant={isMobile ? "subtitle2" : "subtitle1"}
                  gutterBottom
                  sx={{ mb: isMobile ? 1 : 1.5 }}
                >
                  Additional Information
                </Typography>
                <DynamicAttributes
                  attributes={documentData}
                  excludeKeys={COMMON_ATTRIBUTES}
                  columns={isMobile ? 1 : 2}
                  isMobile={isMobile}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
