import { Container, Grid } from "@mui/material";
import { addDays, subDays } from "date-fns";
import React, { useState } from "react";
import { ClientsMetrics } from "../components/charts/ClientsMetrics/ClientsMetrics";
import { ExpenseCategoriesChart } from "../components/charts/ExpenseCategoriesChart/ExpenseCategoriesChart";
import { FacilityChargesChart } from "../components/charts/FacilityChargesChart/FacilityChargesChart";
import { ProfitChart } from "../components/charts/ProfitChart/ProfitChart";
import { DateSelectionMode } from "../components/charts/RevenueChart/revenue-chart.types";
import { RevenueChart } from "../components/charts/RevenueChart/RevenueChart";
import { SalaryMetrics } from "../components/charts/SalaryMetrics/SalaryMetrics";
import { SalesChart } from "../components/charts/SalesChart/SalesChart";
import { DashboardDateSelection } from "../components/DashboardDateSelection";

export const DashboardPage: React.FC = () => {
  const [mode, setMode] = useState<DateSelectionMode>("auto");
  const [periodDays, setPeriodDays] = useState<number>(30);

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

  return (
    <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
      <DashboardDateSelection
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
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <RevenueChart
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            prevStartDate={prevStartDate}
            prevEndDate={prevEndDate}
            periodDays={periodDays}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ProfitChart
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            prevStartDate={prevStartDate}
            prevEndDate={prevEndDate}
            periodDays={periodDays}
          />
        </Grid>
        <Grid item xs={12}>
          <ExpenseCategoriesChart startDate={startDate} endDate={endDate} />
        </Grid>
        <Grid item xs={12}>
          <FacilityChargesChart
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            prevStartDate={prevStartDate}
            prevEndDate={prevEndDate}
            periodDays={periodDays}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <SalesChart startDate={startDate} endDate={endDate} />
        </Grid>
        <Grid item xs={12} md={6}>
          <ClientsMetrics startDate={startDate} endDate={endDate} />
        </Grid>
        <Grid item xs={12} md={6}>
          <SalaryMetrics startDate={startDate} endDate={endDate} />
        </Grid>
      </Grid>
    </Container>
  );
};
