import { useTypedNavigate } from "@/hooks/useTypedNavigate";
import { Container } from "@mui/material";
import { format, parse } from "date-fns";
import { useLocation, useSearchParams } from "react-router";
import { DateSelectionMode } from "../components/charts/RevenueChart/revenue-chart.types";
import { ChartsGrid } from "../components/ChartsGrid";
import { DateSelection } from "../components/DateSelection";
import { ChartType } from "../config/chart-types";
import { useDashboardDates } from "../hooks/useDashboardDates";

interface LocationState {
  startDate?: string;
  endDate?: string;
  prevStartDate?: string;
  prevEndDate?: string;
  mode?: DateSelectionMode;
  periodDays?: number;
}

export const DashboardPage: React.FC = () => {
  const navigate = useTypedNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  const state = location.state as LocationState;

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
  } = useDashboardDates({
    initialMode: (searchParams.get("mode") as DateSelectionMode) || state?.mode,
    initialStartDate: searchParams.get("startDate")
      ? parse(searchParams.get("startDate")!, "dd-MM-yyyy", new Date())
      : state?.startDate
      ? parse(state.startDate, "dd-MM-yyyy", new Date())
      : undefined,
    initialEndDate: searchParams.get("endDate")
      ? parse(searchParams.get("endDate")!, "dd-MM-yyyy", new Date())
      : state?.endDate
      ? parse(state.endDate, "dd-MM-yyyy", new Date())
      : undefined,
    initialPrevStartDate: searchParams.get("prevStartDate")
      ? parse(searchParams.get("prevStartDate")!, "dd-MM-yyyy", new Date())
      : state?.prevStartDate
      ? parse(state.prevStartDate, "dd-MM-yyyy", new Date())
      : undefined,
    initialPeriodDays: searchParams.get("periodDays")
      ? parseInt(searchParams.get("periodDays")!)
      : state?.periodDays,
  });

  const handleChartClick = (chartType: ChartType) => {
    const params = new URLSearchParams();
    if (startDate) params.set("startDate", format(startDate, "dd-MM-yyyy"));
    if (endDate) params.set("endDate", format(endDate, "dd-MM-yyyy"));
    if (prevStartDate)
      params.set("prevStartDate", format(prevStartDate, "dd-MM-yyyy"));
    if (prevEndDate)
      params.set("prevEndDate", format(prevEndDate, "dd-MM-yyyy"));
    params.set("mode", mode);
    params.set("periodDays", periodDays.toString());

    const navigationState = {
      startDate: startDate ? format(startDate, "dd-MM-yyyy") : undefined,
      endDate: endDate ? format(endDate, "dd-MM-yyyy") : undefined,
      prevStartDate: prevStartDate
        ? format(prevStartDate, "dd-MM-yyyy")
        : undefined,
      prevEndDate: prevEndDate ? format(prevEndDate, "dd-MM-yyyy") : undefined,
      mode,
      periodDays,
    };

    navigate.navigateTo(
      `/dashboard/chart/:chartType?${params.toString()}`,
      { chartType },
      { state: navigationState }
    );
  };

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
      />
      <ChartsGrid
        mode={mode}
        startDate={startDate}
        endDate={endDate}
        prevStartDate={prevStartDate}
        prevEndDate={prevEndDate}
        periodDays={periodDays}
        onChartClick={handleChartClick}
      />
    </Container>
  );
};
