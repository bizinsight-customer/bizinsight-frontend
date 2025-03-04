import { Description as DescriptionIcon } from "@mui/icons-material";
import {
  Box,
  Card,
  CardContent,
  Chip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { format } from "date-fns";
import { useNavigate } from "react-router";
import { Document } from "../../../types/document.types";

interface DocumentCardProps {
  document: Document;
}

export const DocumentCard = ({ document }: DocumentCardProps) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const { document_type, description, updated_at, amount, currency } =
    document.attributes;
  const { id } = document;

  return (
    <Card
      sx={{
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
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
          <Chip
            label={`${amount.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })} ${currency}`}
            size={isMobile ? "small" : "medium"}
            color="primary"
            variant="outlined"
          />
        </Box>
      </CardContent>
    </Card>
  );
};
