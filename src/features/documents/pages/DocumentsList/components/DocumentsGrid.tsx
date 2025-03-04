import { Grid, useMediaQuery, useTheme } from "@mui/material";
import { Document } from "../../../types/document.types";
import { DocumentCard } from "./DocumentCard";

interface DocumentsGridProps {
  documents: Document[];
}

export const DocumentsGrid = ({ documents }: DocumentsGridProps) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Grid container spacing={isMobile ? 2 : 3}>
      {documents.map((document) => (
        <Grid item xs={12} sm={6} md={4} key={document.id}>
          <DocumentCard document={document} />
        </Grid>
      ))}
    </Grid>
  );
};
