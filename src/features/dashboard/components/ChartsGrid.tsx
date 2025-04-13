import { Grid } from "@mui/material";
import { ChartType } from "../config/chart-types";
import { ChartWrapper } from "./ChartWrapper";
import { AverageTicketChart } from "./charts/AverageTicketChart/AverageTicketChart";
import { ClientsMetrics } from "./charts/ClientsMetrics/ClientsMetrics";
import { CogsChart } from "./charts/CogsChart/CogsChart";
import { ExpenseCategoriesChart } from "./charts/ExpenseCategoriesChart/ExpenseCategoriesChart";
import { FacilityChargesChart } from "./charts/FacilityChargesChart/FacilityChargesChart";
import { MarketingChart } from "./charts/MarketingChart/MarketingChart";
import { ProfitChart } from "./charts/ProfitChart/ProfitChart";
import { ROMIChart } from "./charts/ROMIChart/ROMIChart";
import { ReturnRateChart } from "./charts/ReturnRateChart/ReturnRateChart";
import { RevenueChart } from "./charts/RevenueChart/RevenueChart";
import { DateSelectionMode } from "./charts/RevenueChart/revenue-chart.types";
import { RevenueExpenseRatioChart } from "./charts/RevenueExpenseRatioChart/RevenueExpenseRatioChart";
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
  onChartClick: (chartType: ChartType) => void;
}

export const ChartsGrid: React.FC<ChartsGridProps> = ({
  mode,
  startDate,
  endDate,
  prevStartDate,
  prevEndDate,
  periodDays,
  onChartClick,
}) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="revenue" onChartClick={onChartClick}>
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
        <ChartWrapper chartType="profit" onChartClick={onChartClick}>
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
        <ChartWrapper
          chartType="expense-categories"
          onChartClick={onChartClick}
        >
          <ExpenseCategoriesChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12}>
        <ChartWrapper chartType="stock-procurement" onChartClick={onChartClick}>
          <StockProcurementChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12}>
        <ChartWrapper chartType="facility-charges" onChartClick={onChartClick}>
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
        <ChartWrapper chartType="sales" onChartClick={onChartClick}>
          <SalesChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="clients" onChartClick={onChartClick}>
          <ClientsMetrics startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="salary" onChartClick={onChartClick}>
          <SalaryMetrics startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper
          chartType="unforeseen-expenses"
          onChartClick={onChartClick}
        >
          <UnforeseenExpensesChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="marketing" onChartClick={onChartClick}>
          <MarketingChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="romi" onChartClick={onChartClick}>
          <ROMIChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="cogs" onChartClick={onChartClick}>
          <CogsChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="average-ticket" onChartClick={onChartClick}>
          <AverageTicketChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={6}>
        <ChartWrapper chartType="return-rate" onChartClick={onChartClick}>
          <ReturnRateChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
      <Grid item xs={12} md={12}>
        <ChartWrapper
          chartType="revenue-expense-ratio"
          onChartClick={onChartClick}
        >
          <RevenueExpenseRatioChart startDate={startDate} endDate={endDate} />
        </ChartWrapper>
      </Grid>
    </Grid>
  );
};
