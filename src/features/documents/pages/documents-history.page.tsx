import { Box, Paper } from "@mui/material";
import { DataGrid, GridPaginationModel } from "@mui/x-data-grid";
import { format, parseISO } from "date-fns";
import { useState } from "react";
import { useGetDocumentsHistoryQuery } from "../store/documents-history.api-slice";

export const DocumentsHistoryPage = () => {
  const [paginationModel, setPaginationModel] = useState<GridPaginationModel>({
    page: 0,
    pageSize: 25,
  });

  const { data, isLoading } = useGetDocumentsHistoryQuery({
    page: paginationModel.page + 1, // API uses 1-based indexing
    per_page: paginationModel.pageSize,
  });

  const columns = [
    {
      field: "created_at",
      headerName: "Upload Date",
      flex: 1,
      valueFormatter: (params: string) => {
        if (!params) return "";
        try {
          return format(parseISO(params), "PPpp");
        } catch {
          console.error(`Invalid date format: ${params}`);
          return "Invalid date";
        }
      },
    },
    {
      field: "filename",
      headerName: "File Name",
      flex: 1,
    },
    {
      field: "document_type",
      headerName: "Document Type",
      flex: 1,
      valueFormatter: (params: { value: string }) =>
        params?.value?.replace(/_/g, " ").toLowerCase(),
    },
    {
      field: "file_type",
      headerName: "File Type",
      flex: 1,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Paper sx={{ height: 600, width: "100%" }}>
        <DataGrid
          rows={data?.items || []}
          columns={columns}
          getRowId={(row) => row.document_id}
          loading={isLoading}
          disableRowSelectionOnClick
          paginationMode="server"
          rowCount={data?.total || 0}
          paginationModel={paginationModel}
          onPaginationModelChange={setPaginationModel}
          pageSizeOptions={[10, 25, 50]}
        />
      </Paper>
    </Box>
  );
};
