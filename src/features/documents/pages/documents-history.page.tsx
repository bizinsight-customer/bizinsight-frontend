import { DocumentsGrid } from "@/components/common/DocumentsGrid/DocumentsGrid";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Box } from "@mui/material";
import { useGetDocumentsHistoryQuery } from "../store/documents-history.api-slice";

export const DocumentsHistoryPage = () => {
  const { data, isLoading } = useGetDocumentsHistoryQuery({});

  console.log(data);

  if (isLoading) {
    return <LoadingSpinner text="Loading documents history..." />;
  }

  return (
    <Box sx={{ p: 3, height: "calc(100vh - 200px)" }}>
      <DocumentsGrid documents={data || []} />
    </Box>
  );
};
