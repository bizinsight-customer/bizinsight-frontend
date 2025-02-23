import { Box, Typography } from "@mui/material";
import { MetadataField } from "./MetadataField";

interface CompanyInfoProps {
  company: JsonApiCompany;
  title: string;
}

export const CompanyInfo = ({ company, title }: CompanyInfoProps) => {
  const { attributes } = company;

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <MetadataField label="Company Name" value={attributes.name} />
      <MetadataField label="Tax Number" value={attributes.tax_number} />
      <MetadataField
        label="Registration Number"
        value={attributes.registration_number}
      />
      <MetadataField label="Legal Address" value={attributes.legal_address} />
      {attributes.postal_address && (
        <MetadataField
          label="Postal Address"
          value={attributes.postal_address}
        />
      )}
      {attributes.email && (
        <MetadataField label="Email" value={attributes.email} />
      )}
      {attributes.phone && (
        <MetadataField label="Phone" value={attributes.phone} />
      )}
      {attributes.bank_name && (
        <MetadataField label="Bank Name" value={attributes.bank_name} />
      )}
      {attributes.bank_account && (
        <MetadataField label="Bank Account" value={attributes.bank_account} />
      )}
      {attributes.bank_swift && (
        <MetadataField label="Bank SWIFT" value={attributes.bank_swift} />
      )}
      {attributes.website && (
        <MetadataField label="Website" value={attributes.website} />
      )}
    </Box>
  );
};
