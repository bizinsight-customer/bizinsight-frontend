import { Box } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React from "react";

interface DateRangePickerProps {
  startDate: Date | null;
  endDate: Date | null;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2 }}>
      <DatePicker
        label="Start Date"
        value={startDate}
        onChange={onStartDateChange}
        format="dd.MM.yyyy"
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
          },
        }}
      />
      <DatePicker
        label="End Date"
        value={endDate}
        onChange={onEndDateChange}
        format="dd.MM.yyyy"
        slotProps={{
          textField: {
            size: "small",
            fullWidth: true,
          },
        }}
      />
    </Box>
  );
};
