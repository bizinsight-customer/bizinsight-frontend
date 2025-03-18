import useFormatCurrency from "@/hooks/useFormatCurrency";
import { Box, Typography } from "@mui/material";
import React from "react";
import {
  ChartEntry,
  CustomTooltipProps,
} from "./RevenueChart/revenue-chart.types";

export const CustomTooltip: React.FC<CustomTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const { format: formatCurrency } = useFormatCurrency();

  if (!active || !payload || !payload.length) return null;

  const currentValue = payload.find((p) => p.dataKey === "current");
  const previousValue = payload.find((p) => p.dataKey === "previous");
  const entry = payload[0].payload as ChartEntry;

  return (
    <Box
      sx={{ p: 1, bgcolor: "background.paper", boxShadow: 1, borderRadius: 1 }}
    >
      <Typography variant="body2" sx={{ mb: 1 }}>
        {currentValue && (
          <Box>
            Current ({label}): {formatCurrency(Number(currentValue.value))}
          </Box>
        )}
        {previousValue && (
          <Box>
            Previous ({entry.originalDate}):{" "}
            {formatCurrency(Number(previousValue.value))}
          </Box>
        )}
      </Typography>
    </Box>
  );
};
