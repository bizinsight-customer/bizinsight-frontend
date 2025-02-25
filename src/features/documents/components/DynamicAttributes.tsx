import { Box, Grid, Paper, Typography } from "@mui/material";
import { MetadataField } from "./MetadataField";

interface DynamicAttributesProps {
  attributes: Record<string, unknown>;
  excludeKeys?: readonly string[];
  columns?: number;
  isMobile?: boolean;
}

export const DynamicAttributes = ({
  attributes,
  excludeKeys = [],
  columns = 2,
  isMobile = false,
}: DynamicAttributesProps) => {
  const formatKey = (key: string): string => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const renderValue = (key: string, value: unknown, depth = 0): JSX.Element => {
    if (value === null || value === undefined) {
      return <MetadataField key={key} label={formatKey(key)} value="-" />;
    }

    if (typeof value === "object" && !Array.isArray(value)) {
      return (
        <Box key={key} sx={{ mb: depth === 0 ? 3 : 2, width: "100%" }}>
          <Paper
            elevation={0}
            variant="outlined"
            sx={{
              p: 2,
              backgroundColor: "grey.50",
            }}
          >
            <Typography
              variant="subtitle1"
              sx={{ mb: 2, fontWeight: "medium" }}
            >
              {formatKey(key)}
            </Typography>
            <Box sx={{ pl: 2 }}>
              <Grid container spacing={2}>
                {Object.entries(value as Record<string, unknown>).map(
                  ([childKey, childValue]) => (
                    <Grid
                      item
                      xs={12}
                      md={columns === 2 ? 6 : 12}
                      key={childKey}
                    >
                      {renderValue(childKey, childValue, depth + 1)}
                    </Grid>
                  )
                )}
              </Grid>
            </Box>
          </Paper>
        </Box>
      );
    }

    if (Array.isArray(value)) {
      return (
        <MetadataField
          key={key}
          label={formatKey(key)}
          value={value
            .map((item) =>
              typeof item === "object" ? JSON.stringify(item) : String(item)
            )
            .join(", ")}
        />
      );
    }

    return (
      <MetadataField key={key} label={formatKey(key)} value={String(value)} />
    );
  };

  const filteredEntries = Object.entries(attributes).filter(
    ([key, value]) =>
      !excludeKeys.includes(key) &&
      value !== null &&
      value !== undefined &&
      value !== "" &&
      !Array.isArray(value) &&
      typeof value !== "object"
  );

  if (filteredEntries.length === 0) {
    return (
      <Typography variant={isMobile ? "body2" : "body1"} color="text.secondary">
        No additional information available
      </Typography>
    );
  }

  return (
    <Grid container spacing={isMobile ? 1.5 : 2}>
      {filteredEntries.map(([key, value]) => (
        <Grid item xs={12} md={12 / columns} key={key}>
          <MetadataField
            label={key
              .split("_")
              .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(" ")}
            value={String(value)}
            isMobile={isMobile}
          />
        </Grid>
      ))}
    </Grid>
  );
};
