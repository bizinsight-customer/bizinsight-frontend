import { Grid, Typography } from "@mui/material";
import { ReadOnlyTextField } from "./ReadOnlyTextField";

interface Company {
  name?: string;
  email?: string;
  phone?: string;
  tax_number?: string;
  registration_number?: string;
  legal_address?: string;
  postal_address?: string;
  bank_name?: string;
  bank_account?: string;
  bank_swift?: string;
  website?: string;
}

interface CompanyInfoFieldsProps {
  company?: Company;
  title: string;
}

export const CompanyInfoFields = ({
  company,
  title,
}: CompanyInfoFieldsProps) => (
  <>
    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
      {title}
    </Typography>
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Company Name" value={company?.name} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Email" value={company?.email} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Phone" value={company?.phone} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Tax Number" value={company?.tax_number} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField
          label="Registration Number"
          value={company?.registration_number}
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Website" value={company?.website} />
      </Grid>
      <Grid item xs={12}>
        <ReadOnlyTextField
          label="Legal Address"
          value={company?.legal_address}
          multiline
        />
      </Grid>
      <Grid item xs={12}>
        <ReadOnlyTextField
          label="Postal Address"
          value={company?.postal_address}
          multiline
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Bank Name" value={company?.bank_name} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Bank Account" value={company?.bank_account} />
      </Grid>
      <Grid item xs={12} md={4}>
        <ReadOnlyTextField label="Bank SWIFT" value={company?.bank_swift} />
      </Grid>
    </Grid>
  </>
);
