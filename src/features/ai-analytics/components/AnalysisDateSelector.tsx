import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";

type AnalysisMode = "year" | "month";

interface AnalysisDateSelectorProps {
  year: number;
  month: number | null;
  onYearChange: (year: number) => void;
  onMonthChange: (month: number | null) => void;
  onAnalyze: () => void;
}

export const AnalysisDateSelector: React.FC<AnalysisDateSelectorProps> = ({
  year,
  month,
  onYearChange,
  onMonthChange,
  onAnalyze,
}) => {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i);
  const months = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(2000, i).toLocaleString("default", { month: "long" }),
  }));

  const mode: AnalysisMode = month === null ? "year" : "month";

  const handleModeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: AnalysisMode | null
  ) => {
    if (newMode === null) return; // Prevent deselection
    if (newMode === "year") {
      onMonthChange(null);
    } else {
      onMonthChange(1); // Set default month when switching to month mode
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Box sx={{ width: "100%", maxWidth: 500 }}>
        <Typography variant="h6" sx={{ mb: 3, textAlign: "center" }}>
          Analysis Period
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            alignItems: "center",
          }}
        >
          <ToggleButtonGroup
            value={mode}
            exclusive
            onChange={handleModeChange}
            aria-label="analysis mode"
          >
            <ToggleButton value="year" aria-label="one year analysis">
              One Year Analysis
            </ToggleButton>
            <ToggleButton value="month" aria-label="one month analysis">
              One Month Analysis
            </ToggleButton>
          </ToggleButtonGroup>

          <Box sx={{ display: "flex", gap: 2, alignItems: "flex-start" }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Year</InputLabel>
              <Select
                value={year}
                label="Year"
                onChange={(e) => onYearChange(e.target.value as number)}
              >
                {years.map((y) => (
                  <MenuItem key={y} value={y}>
                    {y}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {mode === "month" && (
              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>Month</InputLabel>
                <Select
                  value={month || ""}
                  label="Month"
                  onChange={(e) => onMonthChange(e.target.value as number)}
                >
                  {months.map(({ value, label }) => (
                    <MenuItem key={value} value={value}>
                      {label}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            )}
          </Box>

          <Button variant="contained" onClick={onAnalyze} sx={{ mt: 2 }}>
            Analyze
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
