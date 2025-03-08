import useFormatCurrency from "@/hooks/useFormatCurrency";
import { Box, Paper, Typography } from "@mui/material";
import { addDays, differenceInDays, format, subDays } from "date-fns";
import React, { useState } from "react";
import {
  Area,
  AreaChart,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useGetProfitQuery } from "../../../services/profit-api";
import { CustomTooltip } from "../CustomTooltip";
import { DateSelection } from "../DateSelection";
import { formatChartDate, parseDateSafely } from "../utils/date-utils";
import {
  ChartEntry,
  DATE_FORMAT,
  DateSelectionMode,
} from "./profit-chart.types";

export const ProfitChart: React.FC = () => {
  const [mode, setMode] = useState<DateSelectionMode>("auto");
  const [periodDays, setPeriodDays] = useState<number>(30);
  const { format: formatCurrency } = useFormatCurrency();

  // Current period dates
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // Previous period dates for manual mode
  const [prevStartDate, setPrevStartDate] = useState<Date | null>(null);
  const [prevEndDate, setPrevEndDate] = useState<Date | null>(null);

  // Reset or set previous dates when switching modes or when startDate changes
  React.useEffect(() => {
    if (mode === "auto") {
      setPrevStartDate(null);
      setPrevEndDate(null);
    } else if (mode === "manual" && startDate) {
      setPrevStartDate(subDays(startDate, periodDays));
    }
  }, [mode, startDate, periodDays]);

  // Calculate end dates based on period days in manual mode
  React.useEffect(() => {
    if (mode === "manual" && startDate && periodDays > 0) {
      setEndDate(addDays(startDate, periodDays));
    }
    if (mode === "manual" && prevStartDate && periodDays > 0) {
      setPrevEndDate(addDays(prevStartDate, periodDays));
    }
  }, [mode, startDate, prevStartDate, periodDays]);

  const {
    data: profitData,
    isLoading,
    error,
  } = useGetProfitQuery(
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
    if (!profitData || !startDate || !endDate) return [];

    const periodDuration = differenceInDays(endDate, startDate);
    const entriesByDate = new Map<string, ChartEntry>();

    // Process current period entries
    profitData.current_period.entries.forEach((entry) => {
      const date = parseDateSafely(entry.date);
      if (!date) return;

      const displayDate = formatChartDate(date);
      entriesByDate.set(displayDate, {
        displayDate,
        current: entry.profit,
      });
    });

    // Process and align previous period entries
    profitData.previous_period.entries.forEach((entry) => {
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
        previous: entry.profit,
      });
    });

    return Array.from(entriesByDate.values()).sort((a, b) => {
      const dateA = new Date(a.displayDate);
      const dateB = new Date(b.displayDate);
      return dateA.getTime() - dateB.getTime();
    });
  }, [profitData, startDate, endDate, mode, prevStartDate]);

  return (
    <Paper
      sx={{ p: 3, height: "500px", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Profit Over Time</Typography>
        </Box>

        <DateSelection
          mode={mode}
          startDate={startDate}
          endDate={endDate}
          prevStartDate={prevStartDate}
          prevEndDate={prevEndDate}
          periodDays={periodDays}
          onModeChange={setMode}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
          onPrevStartDateChange={setPrevStartDate}
          onPeriodDaysChange={setPeriodDays}
        />
      </Box>

      {isLoading && <Typography>Loading...</Typography>}
      {error && (
        <Typography color="error">Error loading profit data</Typography>
      )}

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
                    : `${formatChartDate(
                        subDays(startDate, periodDays)
                      )} - ${formatChartDate(subDays(endDate, periodDays))}`
                }`}
                connectNulls
              />
              <Area
                type="monotone"
                dataKey="current"
                stroke="#684AFF"
                strokeWidth={3}
                fill="url(#currentGradient)"
                name={`Current Period ${formatChartDate(
                  startDate
                )} - ${formatChartDate(endDate)}`}
                connectNulls
              />
            </AreaChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Paper>
  );
};
