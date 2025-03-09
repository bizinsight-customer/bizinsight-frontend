import {
  Box,
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
import React from "react";
import { DATE_FORMAT } from "./charts/RevenueChart/revenue-chart.types";

export interface DashboardDateSelectionProps {
  mode: "auto" | "manual";
  startDate: Date | null;
  endDate: Date | null;
  prevStartDate: Date | null;
  prevEndDate: Date | null;
  periodDays: number;
  onModeChange: (mode: "auto" | "manual") => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onPrevStartDateChange: (date: Date | null) => void;
  onPeriodDaysChange: (days: number) => void;
}

export const DashboardDateSelection: React.FC<DashboardDateSelectionProps> = ({
  mode,
  startDate,
  endDate,
  prevStartDate,
  periodDays,
  onModeChange,
  onStartDateChange,
  onEndDateChange,
  onPrevStartDateChange,
  onPeriodDaysChange,
}) => {
  const handlePeriodDaysChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseInt(event.target.value);
    if (!isNaN(value) && value > 0) {
      onPeriodDaysChange(value);
    }
  };

  return (
    <Box sx={{ mb: 3, p: 2, bgcolor: "background.paper", borderRadius: 1 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Dashboard Period
      </Typography>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          alignItems: "flex-start",
          flexWrap: "wrap",
        }}
      >
        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Date Selection Mode</InputLabel>
          <Select
            value={mode}
            label="Date Selection Mode"
            onChange={(e) => onModeChange(e.target.value as "auto" | "manual")}
          >
            <MenuItem value="auto">Automatic Previous Period</MenuItem>
            <MenuItem value="manual">Manual Previous Period</MenuItem>
          </Select>
        </FormControl>

        <LocalizationProvider dateAdapter={AdapterDateFns}>
          {mode === "auto" && (
            <Box sx={{ display: "flex", gap: 2 }}>
              <DatePicker
                label="Current Period Start"
                value={startDate}
                onChange={onStartDateChange}
                format={DATE_FORMAT}
                slotProps={{ textField: { size: "small" } }}
              />
              <DatePicker
                label="Current Period End"
                value={endDate}
                onChange={onEndDateChange}
                format={DATE_FORMAT}
                slotProps={{ textField: { size: "small" } }}
              />
            </Box>
          )}

          {mode === "manual" && (
            <Box sx={{ display: "flex", gap: 4 }}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <DatePicker
                  label="Current Period Start"
                  value={startDate}
                  onChange={onStartDateChange}
                  format={DATE_FORMAT}
                  slotProps={{ textField: { size: "small" } }}
                />
                <DatePicker
                  label="Previous Period Start"
                  value={prevStartDate}
                  onChange={onPrevStartDateChange}
                  format={DATE_FORMAT}
                  slotProps={{ textField: { size: "small" } }}
                />
              </Box>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <TextField
                  label="Period Days"
                  type="number"
                  size="small"
                  value={periodDays}
                  onChange={handlePeriodDaysChange}
                  inputProps={{ min: 1 }}
                  sx={{ width: 120 }}
                />
              </Box>
            </Box>
          )}
        </LocalizationProvider>
      </Box>
    </Box>
  );
};
