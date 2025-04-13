import { DocumentInfo } from "@/types/document.types";
import metricApi from "../api-slices";
import { ChartType } from "./chart-types";

interface ApiHookResult {
  data?: {
    documents?: DocumentInfo[];
  };
  isLoading: boolean;
  error?: unknown;
}

type ApiHook = (
  params: {
    start_date: string;
    end_date: string;
    previous_start_date?: string;
    previous_end_date?: string;
  },
  options?: {
    skip?: boolean;
  }
) => ApiHookResult;

export const CHART_API_HOOKS: Record<ChartType, ApiHook> = {
  revenue: metricApi.revenue.useGetDataQuery,
  profit: metricApi.profit.useGetDataQuery,
  "expense-categories": metricApi.expenseCategories.useGetDataQuery,
  "stock-procurement": metricApi.stockProcurement.useGetDataQuery,
  "facility-charges": metricApi.facility.useGetDataQuery,
  sales: metricApi.sales.useGetDataQuery,
  salary: metricApi.salary.useGetDataQuery,
  "unforeseen-expenses": metricApi.unforeseenExpenses.useGetDataQuery,
  marketing: metricApi.marketing.useGetDataQuery,
  clients: metricApi.clientsMetrics.useGetDataQuery,
  "average-ticket": metricApi.averageTicket.useGetDataQuery,
  cogs: metricApi.cogs.useGetDataQuery,
  "return-rate": metricApi.returnRate.useGetDataQuery,
  "revenue-expense-ratio": metricApi.revenueExpenseRatio.useGetDataQuery,
  romi: metricApi.romi.useGetDataQuery,
};
