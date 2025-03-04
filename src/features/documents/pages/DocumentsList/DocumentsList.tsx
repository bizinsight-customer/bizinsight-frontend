import { useApiErrorDisplay } from "@/hooks/useApiErrorDisplay";
import { getApiErrorMessage } from "@/utils/api-error.utils";
import {
  Box,
  CircularProgress,
  Pagination,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useGetDocumentsQuery } from "../../store/documents-api.slice";
import { DocumentsGrid } from "./components/DocumentsGrid";
import { DocumentsHeader } from "./components/DocumentsHeader";
import { EmptyDocumentsList } from "./components/EmptyDocumentsList";

const ITEMS_PER_PAGE = 10;

export const DocumentsList = () => {
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

  const totalPages = documents?.meta?.totalPages || 1;

  return (
    <Box p={isMobile ? 2 : 3}>
      <DocumentsHeader />

      {!documents?.length ? (
        <EmptyDocumentsList />
      ) : (
        <DocumentsGrid documents={documents} />
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
