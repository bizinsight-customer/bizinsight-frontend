import { DATE_FORMAT } from "@/types/date.types";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React, { useEffect, useState } from "react";
import { DateSelectionMode } from "./charts/RevenueChart/revenue-chart.types";

interface DateSelectionProps {
  mode: DateSelectionMode;
  startDate: Date | null;
  endDate: Date | null;
  prevStartDate: Date | null;
  periodDays: number;
  includePreviousPeriod?: boolean;
  onModeChange: (mode: DateSelectionMode) => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onPrevStartDateChange: (date: Date | null) => void;
  onPeriodDaysChange: (days: number) => void;
}

export const DateSelection: React.FC<DateSelectionProps> = ({
  mode: initialMode,
  startDate: initialStartDate,
  endDate: initialEndDate,
  prevStartDate: initialPrevStartDate,
  periodDays: initialPeriodDays,
  includePreviousPeriod = true,
  onModeChange,
  onStartDateChange,
  onEndDateChange,
  onPrevStartDateChange,
  onPeriodDaysChange,
}) => {
  // Local state for date values
  const [localMode, setLocalMode] = useState<DateSelectionMode>(initialMode);
  const [localStartDate, setLocalStartDate] = useState<Date | null>(
    initialStartDate
  );
  const [localEndDate, setLocalEndDate] = useState<Date | null>(initialEndDate);
  const [localPrevStartDate, setLocalPrevStartDate] = useState<Date | null>(
    initialPrevStartDate
  );
  const [localPeriodDays, setLocalPeriodDays] =
    useState<number>(initialPeriodDays);

  // Update local state when props change
  useEffect(() => {
    setLocalMode(initialMode);
    setLocalStartDate(initialStartDate);
    setLocalEndDate(initialEndDate);
    setLocalPrevStartDate(initialPrevStartDate);
    setLocalPeriodDays(initialPeriodDays);
  }, [
    initialMode,
    initialStartDate,
    initialEndDate,
    initialPrevStartDate,
    initialPeriodDays,
  ]);

  const handlePeriodDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      setLocalPeriodDays(value);
    }
  };

  const handleApply = () => {
    onModeChange(localMode);
    onStartDateChange(localStartDate);
    onEndDateChange(localEndDate);
    onPrevStartDateChange(localPrevStartDate);
    onPeriodDaysChange(localPeriodDays);
  };

  const effectiveMode = includePreviousPeriod ? localMode : "auto";

  return (
    <Box sx={{ mb: 3, p: 4, bgcolor: "background.paper", borderRadius: 1 }}>
      <Typography variant="h6" sx={{ mb: 2 }} textAlign="start">
        Period selection
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        {includePreviousPeriod && (
          <FormControl size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Period Selection Mode</InputLabel>
            <Select
              value={localMode}
              label="Date Selection Mode"
              onChange={(e) =>
                setLocalMode(e.target.value as DateSelectionMode)
              }
            >
              <MenuItem value="auto">Automatic Previous Period</MenuItem>
              <MenuItem value="manual">Manual Previous Period</MenuItem>
            </Select>
          </FormControl>
        )}

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {effectiveMode === "auto" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <DatePicker
                label="Current Period Start"
                value={localStartDate}
                onChange={setLocalStartDate}
                format={DATE_FORMAT}
                slotProps={{ textField: { size: "small" } }}
              />
              <DatePicker
                label="Current Period End"
                value={localEndDate}
                onChange={setLocalEndDate}
                format={DATE_FORMAT}
                slotProps={{ textField: { size: "small" } }}
              />
            </Box>
          )}

          {effectiveMode === "manual" && (
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <DatePicker
                  label="Current Period Start"
                  value={localStartDate}
                  onChange={setLocalStartDate}
                  format={DATE_FORMAT}
                  slotProps={{ textField: { size: "small" } }}
                />
                <DatePicker
                  label="Previous Period Start"
                  value={localPrevStartDate}
                  onChange={setLocalPrevStartDate}
                  format={DATE_FORMAT}
                  slotProps={{ textField: { size: "small" } }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Period Days"
                  type="number"
                  size="small"
                  value={localPeriodDays}
                  onChange={handlePeriodDaysChange}
                  inputProps={{ min: 1 }}
                  sx={{ width: 120 }}
                />
              </Box>
            </Box>
          )}
        </LocalizationProvider>

        <Button
          variant="contained"
          onClick={handleApply}
          sx={{ mt: effectiveMode === "manual" ? "auto" : undefined }}
        >
          Apply
        </Button>
      </Box>
    </Box>
  );
};
