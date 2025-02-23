import { ApiErrorDisplay } from "@/components/ApiErrorDisplay";
import { useApiErrorDisplay } from "@/hooks/useApiErrorDisplay";
import { JsonApiResource } from "@/types/json-api.types";
import { Download as DownloadIcon } from "@mui/icons-material";
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
import { useParams } from "react-router";
import { DynamicAttributes } from "../components/DynamicAttributes";
import { MetadataField } from "../components/MetadataField";
import { useGetDocumentQuery } from "../store/documents-api.slice";
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
  const { data, isLoading, error } = useGetDocumentQuery(id ?? "");
  useApiErrorDisplay(error, "Failed to fetch document");

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
          {attributes.file_path && (
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
              onClick={handleDownload}
            >
              Download Original
            </Button>
          )}
        </Box>
        {attributes.description && (
          <Typography color="text.secondary" paragraph>
            {attributes.description}
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
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item xs={12} md={6}>
          <Card sx={{ mb: 3 }}>
            <CardContent>
              {issuerCompany && (
                <CompanyInfo company={issuerCompany} title="Issuer Company" />
              )}
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              {recipientCompany && (
                <CompanyInfo
                  company={recipientCompany}
                  title="Recipient Company"
                />
              )}
            </CardContent>
          </Card>
        </Grid> */}
      </Grid>
    </Box>
  );
};
