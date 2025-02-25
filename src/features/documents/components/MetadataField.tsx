import { Box, Typography } from "@mui/material";

interface MetadataFieldProps {
  label: string;
  value: string | number | null;
  isMobile?: boolean;
}

export const MetadataField = ({
  label,
  value,
  isMobile = false,
}: MetadataFieldProps) => {
  if (!value) return null;

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? "column" : "row"}
      gap={isMobile ? 0.5 : 2}
      mb={isMobile ? 1.5 : 2}
    >
      <Typography
        variant={isMobile ? "body2" : "body1"}
        color="text.secondary"
        sx={{
          minWidth: isMobile ? "auto" : "200px",
          fontWeight: isMobile ? 500 : 400,
        }}
      >
        {label}
      </Typography>
      <Typography
        variant={isMobile ? "body2" : "body1"}
        sx={{
          wordBreak: "break-word",
          flex: 1,
        }}
      >
        {value}
      </Typography>
    </Box>
  );
};
