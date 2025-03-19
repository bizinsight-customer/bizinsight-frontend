import { ApiErrorDisplay } from "@/components/ApiErrorDisplay";
import { useApiErrorDisplay } from "@/hooks/useApiErrorDisplay";
import { JsonApiResource } from "@/types/json-api.types";
import {
  Box,
  CircularProgress,
  Grid,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { CompanyInfoFields } from "../components/CompanyInfoFields";
import { DocumentBasicInfo } from "../components/DocumentBasicInfo";
import { DocumentDataFields } from "../components/DocumentDataFields";
import { DocumentHeader } from "../components/DocumentHeader";
import {
  useDeleteDocumentMutation,
  useGetDocumentQuery,
} from "../store/documents-api.slice";
import { useDownloadDocumentMutation } from "../store/documents-updated.api-slice";
import { Document } from "../types/document.types";

export const DocumentDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const isDeletingRef = useRef(false);
  const isUnmountingRef = useRef(false);
  const isInitialMountRef = useRef(true);

  const { data, isLoading, error } = useGetDocumentQuery(id ?? "", {
    skip: isUnmountingRef.current && !isInitialMountRef.current,
  });

  const [deleteDocument, { isLoading: isDeleting }] =
    useDeleteDocumentMutation();
  const [downloadDocument] = useDownloadDocumentMutation();
  useApiErrorDisplay(error, "Failed to fetch document");

  useEffect(() => {
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }
    return () => {
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

  const handleDownload = async () => {
    if (!id || !attributes.file_path) return;

    try {
      const blob = await downloadDocument(id).unwrap();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = attributes.file_name;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch {
      // Error will be handled by useApiErrorDisplay
    }
  };

  const handleDelete = async () => {
    if (!id) return;
    try {
      isDeletingRef.current = true;
      await deleteDocument(id).unwrap();
      navigate("/documents");
    } catch {
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
        <DocumentHeader
          documentType={attributes.document_type}
          filePath={attributes.file_path}
          fileName={attributes.file_name}
          isMobile={isMobile}
          isDeleting={isDeleting}
          onDownload={handleDownload}
          onDelete={handleDelete}
        />
      </Paper>

      <Grid container spacing={isMobile ? 2 : 3}>
        <Grid item xs={12}>
          <Stack spacing={3}>
            <Paper
              elevation={1}
              sx={{
                p: isMobile ? 2 : 3,
                bgcolor: "background.paper",
              }}
            >
              <DocumentBasicInfo
                documentType={attributes.document_type}
                fileName={attributes.file_name}
                fileType={attributes.file_type}
                amount={attributes.amount}
                currency={attributes.currency}
                documentDate={attributes.document_date}
                createdAt={attributes.created_at}
                updatedAt={attributes.updated_at}
                description={attributes.description}
              />
            </Paper>

            <Paper
              elevation={1}
              sx={{
                p: isMobile ? 2 : 3,
                bgcolor: "background.paper",
              }}
            >
              <CompanyInfoFields
                company={attributes.issuer_company}
                title="Issuer Company Information"
              />
            </Paper>

            <Paper
              elevation={1}
              sx={{
                p: isMobile ? 2 : 3,
                bgcolor: "background.paper",
              }}
            >
              <CompanyInfoFields
                company={attributes.recipient_company}
                title="Recipient Company Information"
              />
            </Paper>

            <Paper
              elevation={1}
              sx={{
                p: isMobile ? 2 : 3,
                bgcolor: "background.paper",
              }}
            >
              <DocumentDataFields documentData={attributes.document_data} />
            </Paper>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};
