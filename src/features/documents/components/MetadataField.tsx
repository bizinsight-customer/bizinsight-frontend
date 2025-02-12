import { Box, Typography } from "@mui/material";

interface MetadataFieldProps {
  label: string;
  value: string | number | React.ReactNode;
}

export const MetadataField = ({ label, value }: MetadataFieldProps) => (
  <Box mb={2}>
    <Typography variant="subtitle2" color="text.secondary" gutterBottom>
      {label}
    </Typography>
    <Typography variant="body1">{value}</Typography>
  </Box>
);
