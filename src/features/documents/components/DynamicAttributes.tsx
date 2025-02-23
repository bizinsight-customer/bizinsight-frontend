import { Box } from "@mui/material";
import { MetadataField } from "./MetadataField";

interface DynamicAttributesProps {
  attributes: Record<string, unknown>;
  excludeKeys?: readonly string[];
}

export const DynamicAttributes = ({
  attributes,
  excludeKeys = [],
}: DynamicAttributesProps) => {
  const formatValue = (value: unknown): string => {
    if (value === null || value === undefined) return "-";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const formatKey = (key: string): string => {
    return key
      .split("_")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  return (
    <Box>
      {Object.entries(attributes)
        .filter(([key]) => !excludeKeys.includes(key))
        .map(([key, value]) => (
          <MetadataField
            key={key}
            label={formatKey(key)}
            value={formatValue(value)}
          />
        ))}
    </Box>
  );
};
