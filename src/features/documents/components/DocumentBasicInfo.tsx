import { Grid, Typography } from "@mui/material";
import { ReadOnlyTextField } from "./ReadOnlyTextField";

interface DocumentBasicInfoProps {
  documentType: string;
  fileName: string;
  fileType: string;
  amount: string | number;
  currency: string;
  documentDate: string;
  createdAt: string;
  updatedAt: string;
  description: string;
}

export const DocumentBasicInfo = ({
  documentType,
  fileName,
  fileType,
  amount,
  currency,
  documentDate,
  createdAt,
  updatedAt,
  description,
}: DocumentBasicInfoProps) => (
  <>
    <Typography variant="h6" gutterBottom>
      Basic Information
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Document Type" value={documentType} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="File Name" value={fileName} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="File Type" value={fileType} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Amount" value={amount} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Currency" value={currency} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Document Date" value={documentDate} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField
          label="Created At"
          value={new Date(createdAt).toLocaleString()}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField
          label="Updated At"
          value={new Date(updatedAt).toLocaleString()}
        />
      </Grid>
      <Grid item xs={12}>
        <ReadOnlyTextField label="Description" value={description} multiline />
      </Grid>
    </Grid>
  </>
);
