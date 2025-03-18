import { Grid } from "@mui/material";
import { ChartWrapper } from "./ChartWrapper";
import { ClientsMetrics } from "./charts/ClientsMetrics/ClientsMetrics";
import { ExpenseCategoriesChart } from "./charts/ExpenseCategoriesChart/ExpenseCategoriesChart";
import { FacilityChargesChart } from "./charts/FacilityChargesChart/FacilityChargesChart";
import { MarketingChart } from "./charts/MarketingChart/MarketingChart";
import { ProfitChart } from "./charts/ProfitChart/ProfitChart";
import { RevenueChart } from "./charts/RevenueChart/RevenueChart";
import { DateSelectionMode } from "./charts/RevenueChart/revenue-chart.types";
import { SalaryMetrics } from "./charts/SalaryMetrics/SalaryMetrics";
import { SalesChart } from "./charts/SalesChart/SalesChart";
import { StockProcurementChart } from "./charts/StockProcurementChart/StockProcurementChart";
import { UnforeseenExpensesChart } from "./charts/UnforeseenExpensesChart/UnforeseenExpensesChart";

interface ChartsGridProps {
  mode: DateSelectionMode;
  startDate: Date | null;
  endDate: Date | null;
  prevStartDate: Date | null;
  prevEndDate: Date | null;
  periodDays: number;
}

export const ChartsGrid: React.FC<ChartsGridProps> = ({
  mode,
  startDate,
  endDate,
  prevStartDate,
  prevEndDate,
  periodDays,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="revenue">
          <RevenueChart
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            prevStartDate={prevStartDate}
            prevEndDate={prevEndDate}
            periodDays={periodDays}
          />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="profit">
          <ProfitChart
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            prevStartDate={prevStartDate}
            prevEndDate={prevEndDate}
            periodDays={periodDays}
          />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12}>
        <ChartWrapper chartType="expense-categories">
          <ExpenseCategoriesChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12}>
        <ChartWrapper chartType="stock-procurement">
          <StockProcurementChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12}>
        <ChartWrapper chartType="facility-charges">
          <FacilityChargesChart
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            prevStartDate={prevStartDate}
            prevEndDate={prevEndDate}
            periodDays={periodDays}
          />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="sales">
          <SalesChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="clients">
          <ClientsMetrics startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="salary">
          <SalaryMetrics startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="unforeseen-expenses">
          <UnforeseenExpensesChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="marketing">
          <MarketingChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
    </Grid>
  );
};
