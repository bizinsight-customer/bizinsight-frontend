import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { Box, Typography } from "@mui/material";
import { addDays, differenceInDays, format, subDays } from "date-fns";
import React from "react";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetRevenueQuery } from "../../../api-slices/revenue.api-slice";
import { CustomTooltip } from "../CustomTooltip";
import { formatChartDate, parseDateSafely } from "../utils/date-utils";
import {
  ChartEntry,
  DATE_FORMAT,
  DateSelectionMode,
} from "./revenue-chart.types";

interface RevenueChartProps {
  mode: DateSelectionMode;
  startDate: Date | null;
  endDate: Date | null;
  prevStartDate: Date | null;
  prevEndDate: Date | null;
  periodDays: number;
}

export const RevenueChart: React.FC<RevenueChartProps> = ({
  mode,
  startDate,
  endDate,
  prevStartDate,
  prevEndDate,
  periodDays,
}) => {
  const { format: formatCurrency } = useFormatCurrency();

  const {
    data: revenueData,
    isLoading,
    error,
  } = useGetRevenueQuery(
    {
      start_date: startDate ? format(startDate, DATE_FORMAT) : "",
      end_date: endDate ? format(endDate, DATE_FORMAT) : "",
      ...(mode === "manual" && prevStartDate && prevEndDate
        ? {
            previous_start_date: format(prevStartDate, DATE_FORMAT),
            previous_end_date: format(prevEndDate, DATE_FORMAT),
          }
        : {}),
    },
    {
      skip:
        !startDate ||
        !endDate ||
        (mode === "manual" && (!prevStartDate || !prevEndDate)),
    }
  );

  const chartData = React.useMemo(() => {
    if (!revenueData || !startDate || !endDate) return [];

    const periodDuration = differenceInDays(endDate, startDate);
    const entriesByDate = new Map<string, ChartEntry>();

    // Process current period entries
    revenueData.current_period.entries.forEach((entry) => {
      const date = parseDateSafely(entry.date);
      if (!date) return;

      const displayDate = formatChartDate(date);
      entriesByDate.set(displayDate, {
        displayDate,
        current: entry.amount,
      });
    });

    // Process and align previous period entries
    revenueData.previous_period.entries.forEach((entry) => {
      const entryDate = parseDateSafely(entry.date);
      if (!entryDate || (mode === "manual" && !prevStartDate)) return;

      const alignedDate =
        mode === "auto"
          ? addDays(entryDate, periodDuration)
          : addDays(entryDate, differenceInDays(startDate, prevStartDate));
      const displayDate = formatChartDate(alignedDate);

      const existingEntry = entriesByDate.get(displayDate) || { displayDate };
      entriesByDate.set(displayDate, {
        ...existingEntry,
        originalDate: formatChartDate(entryDate),
        previous: entry.amount,
      });
    });

    return Array.from(entriesByDate.values()).sort((a, b) => {
      const dateA = new Date(a.displayDate);
      const dateB = new Date(b.displayDate);
      return dateA.getTime() - dateB.getTime();
    });
  }, [revenueData, startDate, endDate, mode, prevStartDate]);

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Revenue Over Time</Typography>
        </Box>
      </Box>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message="Error loading revenue data" />}

      {chartData && (
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
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
              <XAxis dataKey="displayDate" />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<CustomTooltip />} />
              <Legend />
              <Area
                type="monotone"
                dataKey="previous"
                stroke="#FF915F"
                strokeWidth={3}
                fill="url(#previousGradient)"
                name={`Previous Period ${
                  mode === "manual" && prevStartDate && prevEndDate
                    ? `${formatChartDate(prevStartDate)} - ${formatChartDate(
                        prevEndDate
                      )}`
                    : startDate && endDate
                    ? `${formatChartDate(
                        subDays(startDate, periodDays)
                      )} - ${formatChartDate(subDays(endDate, periodDays))}`
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
                    ? `${formatChartDate(startDate)} - ${formatChartDate(
                        endDate
                      )}`
                    : ""
                }`}
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};
