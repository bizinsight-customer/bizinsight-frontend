import { useDeleteDocumentMutation } from "@/features/documents/store/documents-updated.api-slice";
import { useApiErrorDisplay } from "@/hooks/useApiErrorDisplay";
import { useTypedNavigate } from "@/hooks/useTypedNavigate";
import { DocumentInfo } from "@/types/api-updated.types";
import {
  Delete as DeleteIcon,
  Visibility as ViewIcon,
} from "@mui/icons-material";
import { Box, IconButton, Paper } from "@mui/material";
import {
  AllCommunityModule,
  ColDef,
  ICellRendererParams,
  ModuleRegistry,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import { format } from "date-fns";

// Register all community features
ModuleRegistry.registerModules([AllCommunityModule]);

interface DocumentsGridProps {
  documents: DocumentInfo[];
}

interface ActionsCellRendererProps extends ICellRendererParams {
  data: DocumentInfo;
}

const ActionsCellRenderer = (props: ActionsCellRendererProps) => {
  const navigate = useTypedNavigate();
  const { data } = props;
  const [deleteDocument, { error }] = useDeleteDocumentMutation();
  useApiErrorDisplay(error, "Failed to delete document");

  const handleDelete = async () => {
    try {
      await deleteDocument(data.id).unwrap();
    } catch {
      // Error will be handled by useApiErrorDisplay
    }
  };

  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      <IconButton
        size="small"
        onClick={() => navigate.navigateTo("/documents/:id", { id: data.id })}
        color="primary"
        title="View document"
      >
        <ViewIcon />
      </IconButton>
      <IconButton
        size="small"
        onClick={handleDelete}
        color="error"
        title="Delete document"
      >
        <DeleteIcon />
      </IconButton>
    </Box>
  );
};

export const DocumentsGrid = ({ documents }: DocumentsGridProps) => {
  const columnDefs: ColDef[] = [
    {
      field: "original_file_name",
      headerName: "File Name",
      flex: 1,
    },
    {
      field: "document_type",
      headerName: "Type",
      flex: 1,
      valueFormatter: (params) =>
        params.value?.toLowerCase().replace(/_/g, " "),
    },
    {
      field: "converted_amount",
      headerName: "Amount",
      flex: 1,
      valueFormatter: (params) => {
        if (params.data) {
          return `${params.data.converted_amount} ${params.data.converted_currency}`;
        }
        return "";
      },
    },
    {
      field: "document_date",
      headerName: "Date",
      flex: 1,
      valueFormatter: (params) => format(new Date(params.value), "dd MMM yyyy"),
    },
    {
      headerName: "Actions",
      flex: 1,
      minWidth: 120,
      cellRenderer: ActionsCellRenderer,
    },
  ];

  return (
    <Paper sx={{ width: "100%", height: "100%" }}>
      <Box
        className="ag-theme-material"
        sx={{ width: "100%", height: "100%", minHeight: 400 }}
      >
        <AgGridReact
          rowData={documents}
          columnDefs={columnDefs}
          animateRows={true}
          rowSelection="single"
          suppressCellFocus={true}
          defaultColDef={{
            sortable: true,
            filter: true,
            resizable: true,
          }}
        />
      </Box>
    </Paper>
  );
};
