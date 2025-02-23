import { Box, Grid, Paper, Typography } from "@mui/material";
import { MetadataField } from "./MetadataField";

interface DynamicAttributesProps {
  attributes: Record<string, unknown>;
  excludeKeys?: readonly string[];
  columns?: 1 | 2;
}

export const DynamicAttributes = ({
  attributes,
  excludeKeys = [],
  columns = 1,
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
    ([key]) => !excludeKeys.includes(key)
  );

  return (
    <Grid container spacing={2}>
      {filteredEntries.map(([key, value]) => (
        <Grid item xs={12} md={columns === 2 ? 6 : 12} key={key}>
          {renderValue(key, value)}
        </Grid>
      ))}
    </Grid>
  );
};
