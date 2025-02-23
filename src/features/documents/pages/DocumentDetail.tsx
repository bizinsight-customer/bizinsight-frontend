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
} from "@mui/material";
import { useEffect, useRef } from "react"; // Import useRef and useEffect
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

  // Create refs to track component state
  const isDeletingRef = useRef(false);
  const isUnmountingRef = useRef(false);

  // Conditionally skip getDocumentQuery based on isUnmountingRef
  const { data, isLoading, error } = useGetDocumentQuery(id ?? "", {
    skip: isUnmountingRef.current, // Skip query if component is unmounting
  });

  const [deleteDocument, { isLoading: isDeleting }] =
    useDeleteDocumentMutation();
  useApiErrorDisplay(error, "Failed to fetch document");

  useEffect(() => {
    return () => {
      isUnmountingRef.current = true; // Set unmounting ref when component unmounts
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
      <Box p={3}>
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
      isDeletingRef.current = true; // Set deleting ref before delete call
      console.log("Before deleteDocument call");
      await deleteDocument(id).unwrap();
      console.log("After deleteDocument call, before navigate");
      navigate("/documents");
      console.log("After navigate call");
    } catch (error) {
      // Error will be handled by useApiErrorDisplay
    } finally {
      isDeletingRef.current = false; // Reset deleting ref
    }
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
              {attributes.document_type}
            </Typography>
            <Box display="flex" gap={1} mb={2}>
              <Chip label={attributes.document_type} />
            </Box>
          </Box>
          <Box display="flex" gap={2}>
            {attributes.file_path && (
              <Button
                variant="contained"
                startIcon={<DownloadIcon />}
                onClick={handleDownload}
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
            >
              {isDeleting ? "Deleting..." : "Delete"}
            </Button>
          </Box>
        </Box>
        {attributes.description && (
          <Typography color="text.secondary" paragraph>
            {attributes.description}
          </Typography>
        )}
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Document Information
              </Typography>
              <Divider sx={{ mb: 2 }} />
              <MetadataField
                label="Document Type"
                value={attributes.document_type}
              />
              <MetadataField
                label="Created At"
                value={new Date(attributes.created_at).toLocaleString()}
              />
              <MetadataField
                label="Updated At"
                value={new Date(attributes.updated_at).toLocaleString()}
              />
              <Box mt={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Additional Information
                </Typography>
                <DynamicAttributes
                  attributes={documentData}
                  excludeKeys={COMMON_ATTRIBUTES}
                  columns={2}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};
