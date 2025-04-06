import { DocumentsGrid } from "@/components/common/DocumentsGrid/DocumentsGrid";
import { Box, Container, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import { useParams } from "react-router";
import { DateSelection } from "../components/DateSelection";
import { CHART_API_HOOKS } from "../config/chart-api-hooks";
import { CHART_CONFIGS, ChartType } from "../config/chart-types";
import { useDashboardDates } from "../hooks/useDashboardDates";

const useNoopHook = () => ({ data: undefined });

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

  const config = chartType ? CHART_CONFIGS[chartType] : null;
  const useChartApiHook = chartType ? CHART_API_HOOKS[chartType] : useNoopHook;

  const shouldSkipRequest =
    !chartType ||
    !config ||
    (config.includePreviousPeriod && (!prevStartDate || !prevEndDate));

  const { data: chartData } = useChartApiHook(
    {
      start_date: startDate ? format(startDate, "dd.MM.yyyy") : "",
      end_date: endDate ? format(endDate, "dd.MM.yyyy") : "",
      ...(config?.includePreviousPeriod &&
        prevStartDate &&
        prevEndDate && {
          previous_start_date: format(prevStartDate, "dd.MM.yyyy"),
          previous_end_date: format(prevEndDate, "dd.MM.yyyy"),
        }),
    },
    {
      skip: shouldSkipRequest,
    }
  );

  if (!chartType || !config) {
    return <div>Chart not found</div>;
  }

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
      {chartData?.summary && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Summary
          </Typography>
          <Typography variant="body1">{chartData.summary}</Typography>
        </Paper>
      )}
      {chartData?.documents && chartData.documents.length > 0 && (
        <Paper sx={{ mt: 3, p: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Related Documents
          </Typography>
          <Box sx={{ height: 400 }}>
            <DocumentsGrid documents={chartData.documents} />
          </Box>
        </Paper>
      )}
    </Container>
  );
};
