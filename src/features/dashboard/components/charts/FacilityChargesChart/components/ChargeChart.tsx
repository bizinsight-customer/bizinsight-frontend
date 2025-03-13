import useFormatCurrency from "@/hooks/useFormatCurrency";
import { Box, Paper, Typography } from "@mui/material";
import { format, subDays } from "date-fns";
import React from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "../../CustomTooltip";
import { DateSelectionMode } from "../../RevenueChart/revenue-chart.types";
import { ChartEntry } from "../facility-charges-chart.types";

interface ChargeChartProps {
  data: ChartEntry[];
  title: string;
  total: number;
  mode: DateSelectionMode;
  startDate: Date | null;
  endDate: Date | null;
  prevStartDate: Date | null;
  prevEndDate: Date | null;
  periodDays: number;
}

export const ChargeChart: React.FC<ChargeChartProps> = ({
  data,
  title,
  total,
  mode,
  startDate,
  endDate,
  prevStartDate,
  prevEndDate,
  periodDays,
}) => {
  const { format: formatCurrency } = useFormatCurrency();

  return (
    <Paper sx={{ p: 2, height: "200px" }}>
      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        {title}
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          height: "calc(100% - 32px)",
        }}
      >
        <Box sx={{ flex: 1, height: "100%" }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient
                  id="currentGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#684AFF" stopOpacity={0.95} />
                  <stop offset="95%" stopColor="#684AFF" stopOpacity={0.01} />
                </linearGradient>
                <linearGradient
                  id="previousGradient"
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop offset="5%" stopColor="#FF915F" stopOpacity={0.95} />
                  <stop offset="95%" stopColor="#FF915F" stopOpacity={0.01} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="displayDate"
                tickFormatter={(value) => {
                  const entry = data.find((d) => d.displayDate === value);
                  return entry ? format(entry.fullDate, "dd.MM.yyyy") : value;
                }}
              />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip
                content={<CustomTooltip />}
                labelFormatter={(value) => {
                  const entry = data.find((d) => d.displayDate === value);
                  return entry ? format(entry.fullDate, "dd.MM.yyyy") : value;
                }}
              />
              <Area
                type="monotone"
                dataKey="previous"
                stroke="#FF915F"
                strokeWidth={3}
                fill="url(#previousGradient)"
                name={`Previous Period ${
                  mode === "manual" && prevStartDate && prevEndDate
                    ? `${format(prevStartDate, "dd.MM.yyyy")} - ${format(
                        prevEndDate,
                        "dd.MM.yyyy"
                      )}`
                    : startDate && endDate
                    ? `${format(
                        subDays(startDate, periodDays),
                        "dd.MM.yyyy"
                      )} - ${format(
                        subDays(endDate, periodDays),
                        "dd.MM.yyyy"
                      )}`
                    : ""
                }`}
                connectNulls
              />
              <Area
                type="monotone"
                dataKey="current"
                stroke="#684AFF"
                strokeWidth={3}
                fill="url(#currentGradient)"
                name={`Current Period ${
                  startDate && endDate
                    ? `${format(startDate, "dd.MM.yyyy")} - ${format(
                        endDate,
                        "dd.MM.yyyy"
                      )}`
                    : ""
                }`}
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
        <Box sx={{ ml: 3, textAlign: "right", minWidth: "120px" }}>
          <Typography variant="h5" color="primary" sx={{ mb: 0.5 }}>
            {formatCurrency(total)}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Total Amount
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};
