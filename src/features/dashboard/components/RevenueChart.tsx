import { Box, Paper, Typography } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { addDays, differenceInDays, format, parse } from "date-fns";
import React, { useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  TooltipProps,
  XAxis,
  YAxis,
} from "recharts";
import { useGetRevenueQuery } from "../services/revenue-api";

interface ChartEntry {
  displayDate: string;
  originalDate?: string;
  current?: number;
  previous?: number;
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({
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

export const RevenueChart: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const {
    data: revenueData,
    isLoading,
    error,
  } = useGetRevenueQuery(
    {
      start_date: startDate ? format(startDate, "dd.MM.yyyy") : "",
      end_date: endDate ? format(endDate, "dd.MM.yyyy") : "",
    },
    {
      skip: !startDate || !endDate,
    }
  );

  const chartData = React.useMemo(() => {
    if (!revenueData || !startDate || !endDate) return [];

    // Calculate period duration in days
    const periodDuration = differenceInDays(endDate, startDate);

    // Create a map to store entries by display date
    const entriesByDate = new Map<string, ChartEntry>();

    // Process current period entries
    revenueData.current_period.entries.forEach((entry) => {
      const date = parse(entry.date, "dd.MM.yyyy", new Date());
      const displayDate = format(date, "MMM dd");

      entriesByDate.set(displayDate, {
        displayDate,
        current: entry.amount,
      });
    });

    // Process and align previous period entries
    revenueData.previous_period.entries.forEach((entry) => {
      const entryDate = parse(entry.date, "dd.MM.yyyy", new Date());
      const alignedDate = addDays(entryDate, periodDuration);
      const displayDate = format(alignedDate, "MMM dd");

      const existingEntry = entriesByDate.get(displayDate) || { displayDate };
      entriesByDate.set(displayDate, {
        ...existingEntry,
        originalDate: format(entryDate, "MMM dd"),
        previous: entry.amount,
      });
    });

    // Convert map to array and sort by date
    return Array.from(entriesByDate.values()).sort((a, b) => {
      const dateA = new Date(a.displayDate);
      const dateB = new Date(b.displayDate);
      return dateA.getTime() - dateB.getTime();
    });
  }, [revenueData, startDate, endDate]);

  return (
    <Paper sx={{ p: 3, height: "400px" }}>
      <Box sx={{ mb: 3, display: "flex", gap: 2, alignItems: "center" }}>
        <Typography variant="h6">Revenue Over Time</Typography>
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Start Date"
            value={startDate}
            onChange={(newValue) => setStartDate(newValue)}
            slotProps={{
              textField: { size: "small" },
            }}
          />
          <DatePicker
            label="End Date"
            value={endDate}
            onChange={(newValue) => setEndDate(newValue)}
            slotProps={{
              textField: { size: "small" },
            }}
            minDate={startDate || undefined}
          />
        </LocalizationProvider>
      </Box>

      {isLoading && <Typography>Loading...</Typography>}
      {error && (
        <Typography color="error">Error loading revenue data</Typography>
      )}

      {chartData && (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="displayDate" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line
              type="monotone"
              dataKey="current"
              stroke="#8884d8"
              name="Current Period"
              connectNulls
            />
            <Line
              type="monotone"
              dataKey="previous"
              stroke="#82ca9d"
              name="Previous Period"
              connectNulls
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};
