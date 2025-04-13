import { MetricDateRangeArgs } from "@/types/metrics.types";
import metricApi from "../api-slices";

interface MetricsDataParams {
  startDate: string;
  endDate: string;
  prevStartDate?: string;
  prevEndDate?: string;
}

export const useMetricsData = ({
  startDate,
  endDate,
  prevStartDate,
  prevEndDate,
}: MetricsDataParams) => {
  const queryParams: MetricDateRangeArgs = {
    start_date: startDate,
    end_date: endDate,
    previous_start_date: prevStartDate,
    previous_end_date: prevEndDate,
  };

  const averageTicket = metricApi.averageTicket.useGetDataQuery(queryParams);
  const clientsMetrics = metricApi.clientsMetrics.useGetDataQuery(queryParams);
  const cogs = metricApi.cogs.useGetDataQuery(queryParams);
  const expenseCategories =
    metricApi.expenseCategories.useGetDataQuery(queryParams);
  const facility = metricApi.facility.useGetDataQuery(queryParams);
  const marketing = metricApi.marketing.useGetDataQuery(queryParams);
  const profit = metricApi.profit.useGetDataQuery(queryParams);
  const returnRate = metricApi.returnRate.useGetDataQuery(queryParams);
  const revenue = metricApi.revenue.useGetDataQuery(queryParams);
  const revenueExpenseRatio =
    metricApi.revenueExpenseRatio.useGetDataQuery(queryParams);
  const romi = metricApi.romi.useGetDataQuery(queryParams);
  const salary = metricApi.salary.useGetDataQuery(queryParams);
  const sales = metricApi.sales.useGetDataQuery(queryParams);
  const stockProcurement =
    metricApi.stockProcurement.useGetDataQuery(queryParams);
  const unforeseenExpenses =
    metricApi.unforeseenExpenses.useGetDataQuery(queryParams);

  return {
    averageTicket,
    clientsMetrics,
    cogs,
    expenseCategories,
    facility,
    marketing,
    profit,
    returnRate,
    revenue,
    revenueExpenseRatio,
    romi,
    salary,
    sales,
    stockProcurement,
    unforeseenExpenses,
  };
};
