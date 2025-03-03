import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import React from "react";
import {
  DATE_FORMAT,
  DateSelectionProps,
} from "./RevenueChart/revenue-chart.types";

export const DateSelection: React.FC<DateSelectionProps> = ({
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
  return (
    <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
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
        {mode === "auto" ? (
          <Box sx={{ display: "flex", gap: 2 }}>
            <DatePicker
              label="Current Period Start"
              value={startDate}
              onChange={onStartDateChange}
              format={DATE_FORMAT}
              slotProps={{
                textField: { size: "small" },
              }}
            />
            <DatePicker
              label="Current Period End"
              value={endDate}
              onChange={onEndDateChange}
              format={DATE_FORMAT}
              slotProps={{
                textField: { size: "small" },
              }}
              minDate={startDate || undefined}
            />
          </Box>
        ) : (
          <Box sx={{ display: "flex", gap: 4 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <DatePicker
                label="Current Period Start"
                value={startDate}
                onChange={onStartDateChange}
                format={DATE_FORMAT}
                slotProps={{
                  textField: { size: "small" },
                }}
              />
              <DatePicker
                label="Previous Period Start"
                value={prevStartDate}
                onChange={onPrevStartDateChange}
                format={DATE_FORMAT}
                slotProps={{
                  textField: { size: "small" },
                }}
              />
            </Box>
            <TextField
              label="Period Days"
              type="number"
              size="small"
              value={periodDays}
              onChange={(e) =>
                onPeriodDaysChange(Math.max(1, parseInt(e.target.value) || 0))
              }
              sx={{ width: 100 }}
            />
          </Box>
        )}
      </LocalizationProvider>
    </Box>
  );
};
