import { Box, Paper, Typography } from "@mui/material";
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
  if (!active || !payload || !payload.length) return null;

  const currentValue = payload.find((p) => p.dataKey === "current");
  const previousValue = payload.find((p) => p.dataKey === "previous");
  const entry = payload[0].payload as ChartEntry;

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="body2" sx={{ mb: 1 }}>
        {currentValue && (
          <Box>
            Current ({label}): {currentValue.value}
          </Box>
        )}
        {previousValue && (
          <Box>
            Previous ({entry.originalDate}): {previousValue.value}
          </Box>
        )}
      </Typography>
    </Paper>
  );
};
