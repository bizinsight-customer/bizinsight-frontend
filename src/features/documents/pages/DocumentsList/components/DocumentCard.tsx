import { JsonApiResource } from "@/types/json-api.types";
import {
  Delete as DeleteIcon,
  Description as DescriptionIcon,
  Visibility as VisibilityIcon,
} from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { useDeleteDocumentMutation } from "../../../store/documents-updated.api-slice";
import { Document } from "../../../types/document.types";

interface DocumentCardProps {
  document: JsonApiResource<Document>;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [deleteDocument, { isLoading: isDeleting }] =
    useDeleteDocumentMutation();

  const { document_type, description, updated_at, amount, currency } =
    document.attributes;
  const { id } = document;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when clicking delete button
    try {
      await deleteDocument(id).unwrap();
    } catch {
      // Error will be handled by useApiErrorDisplay
    }
  };

  return (
    <Card
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: "10px",
        boxShadow: "none",
        border: "1px solid",
        borderColor: "white",
        position: "relative", // For absolute positioning of delete button
        bgcolor: "white", // White background
      }}
      onClick={() => navigate(`/documents/${id}`)}
    >
      <CardContent sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Box display="flex" alignItems="center" mb={1.5}>
          <DescriptionIcon
            sx={{ mr: 1, fontSize: isMobile ? "1.25rem" : undefined }}
          />
          <Typography variant={isMobile ? "subtitle1" : "h6"} component="div">
            {document_type}
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
            flex: 1,
          }}
        >
          {description || "No description"}
        </Typography>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Typography variant="body2" color="text.secondary">
            {format(new Date(updated_at), "MMM d, yyyy")}
          </Typography>
        </Box>
        <IconButton
          onClick={() => navigate(`/documents/${id}`)}
          size="small"
          sx={{
            position: "absolute",
            right: 40,
            bottom: 8,
            transition: "all 0.2s",
            color: "primary.main",
            "&:hover": {
              opacity: "1 !important",
            },
          }}
        >
          <VisibilityIcon fontSize="small" />
        </IconButton>
        <IconButton
          onClick={handleDelete}
          disabled={isDeleting}
          size="small"
          sx={{
            position: "absolute",
            right: 8,
            bottom: 8,
            opacity: 0.5,
            transition: "all 0.2s",
            color: "text.secondary",
            "&:hover": {
              opacity: "1 !important",
              color: "error.main",
            },
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardContent>
    </Card>
  );
};
