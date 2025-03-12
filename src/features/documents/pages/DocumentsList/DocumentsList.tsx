import { useApiErrorDisplay } from "@/hooks/useApiErrorDisplay";
import { getApiErrorMessage } from "@/utils/api-error.utils";
import { Box, CircularProgress, useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useGetDocumentsQuery } from "../../store/documents-updated.api-slice";
import { DocumentsGrid } from "./components/DocumentsGrid";
import { DocumentsHeader } from "./components/DocumentsHeader";
import { EmptyDocumentsList } from "./components/EmptyDocumentsList";

const ITEMS_PER_PAGE = 40;

export const DocumentsList = () => {
  const [page, setPage] = useState(1);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const loadMoreRef = useRef<HTMLDivElement>(null);

  const {
    data: documents,
    isLoading,
    error,
    isFetching,
  } = useGetDocumentsQuery({
    page,
    per_page: ITEMS_PER_PAGE,
  });

  useApiErrorDisplay(error, "Failed to fetch documents");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        console.log("Intersecting", first.isIntersecting);
        console.log("isFetching", isFetching);
        console.log("documents", documents);
        if (
          first.isIntersecting &&
          !isFetching &&
          documents?.meta.current_page < documents?.meta.total_pages
        ) {
          console.log("Setting page", page);
          setPage((prev) => prev + 1);
        }
      },
      { threshold: 0.1 }
    );

    const currentRef = loadMoreRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [isFetching, documents?.meta.current_page, documents?.meta.total_pages]);

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

  return (
    <Box p={isMobile ? 2 : 3}>
      <DocumentsHeader />

      {!documents?.data?.length ? (
        <EmptyDocumentsList />
      ) : (
        <>
          <DocumentsGrid documents={documents.data} />
          {documents.meta.current_page < documents.meta.total_pages && (
            <Box
              ref={loadMoreRef}
              display="flex"
              justifyContent="center"
              mt={isMobile ? 2 : 4}
              minHeight="100px"
            >
              {isFetching && <CircularProgress />}
            </Box>
          )}
        </>
      )}
    </Box>
  );
};
