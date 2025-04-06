import { DocumentInfo } from "@/types/api-updated.types";
import { useGetExpenseCategoriesQuery } from "../api-slices/expense-categories.api-slice";
import { useGetFacilityChargesQuery } from "../api-slices/facility.api-slice";
import { useGetMarketingMetricsQuery } from "../api-slices/marketing.api-slice";
import { useGetProfitQuery } from "../api-slices/profit.api-slice";
import { useGetRevenueQuery } from "../api-slices/revenue.api-slice";
import { useGetSalaryMetricsQuery } from "../api-slices/salary.api-slice";
import { useGetSalesQuery } from "../api-slices/sales.api-slice";
import { useGetStockProcurementQuery } from "../api-slices/stock-procurement.api-slice";
import { useGetUnforeseenExpensesQuery } from "../api-slices/unforeseen-expenses.api-slice";
import { useGetClientsMetricsQuery } from "../store/clients-metrics.api-slice";
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
  revenue: useGetRevenueQuery,
  profit: useGetProfitQuery,
  "expense-categories": useGetExpenseCategoriesQuery,
  "stock-procurement": useGetStockProcurementQuery,
  "facility-charges": useGetFacilityChargesQuery,
  sales: useGetSalesQuery,
  salary: useGetSalaryMetricsQuery,
  "unforeseen-expenses": useGetUnforeseenExpensesQuery,
  marketing: useGetMarketingMetricsQuery,
  clients: useGetClientsMetricsQuery,
};
