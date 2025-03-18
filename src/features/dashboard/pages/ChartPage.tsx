import { Container, Paper } from "@mui/material";
import { useParams } from "react-router";
import { DateSelection } from "../components/DateSelection";
import { CHART_CONFIGS, ChartType } from "../config/chart-types";
import { useDashboardDates } from "../hooks/useDashboardDates";

export const ChartPage = () => {
  const { chartType } = useParams<{ chartType: ChartType }>();
  const {
    mode,
    startDate,
    endDate,
    prevStartDate,
    prevEndDate,
    periodDays,
    setMode,
    setStartDate,
    setEndDate,
    setPrevStartDate,
    setPeriodDays,
  } = useDashboardDates();

  if (!chartType || !CHART_CONFIGS[chartType]) {
    return <div>Chart not found</div>;
  }

  const config = CHART_CONFIGS[chartType];
  const ChartComponent = config.component;

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <DateSelection
        mode={mode}
        startDate={startDate}
        endDate={endDate}
        prevStartDate={prevStartDate}
        periodDays={periodDays}
        onModeChange={setMode}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        onPrevStartDateChange={setPrevStartDate}
        onPeriodDaysChange={setPeriodDays}
        includePreviousPeriod={config.includePreviousPeriod}
      />
      <Paper sx={{ mt: 3, p: 6 }}>
        <ChartComponent
          mode={mode}
          startDate={startDate}
          endDate={endDate}
          prevStartDate={prevStartDate}
          prevEndDate={prevEndDate}
          periodDays={periodDays}
        />
      </Paper>
    </Container>
  );
};
