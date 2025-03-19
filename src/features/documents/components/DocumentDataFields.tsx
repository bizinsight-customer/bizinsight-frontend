import { Grid, Typography } from "@mui/material";
import { ReadOnlyTextField } from "./ReadOnlyTextField";

interface DocumentDataFieldsProps {
  documentData?: Record<string, unknown>;
}

export const DocumentDataFields = ({
  documentData,
}: DocumentDataFieldsProps) => (
  <>
    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
      Document Data
    </Typography>
    <Grid container spacing={2}>
      {Object.entries(documentData || {}).map(([key, value]) => (
        <Grid item xs={12} md={6} key={key}>
          <ReadOnlyTextField
            label={key
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
            value={value as string}
          />
        </Grid>
      ))}
    </Grid>
  </>
);
