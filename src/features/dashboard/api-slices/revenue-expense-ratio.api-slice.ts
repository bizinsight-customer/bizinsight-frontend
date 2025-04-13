import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface RevenueExpenseRatioMetricData extends BaseMetricData {
  revenue: number;
  expenses: number;
  revenue_percent: number;
  expenses_percent: number;
}

const apiSlice = createMetricApiSlice<RevenueExpenseRatioMetricData>({
  reducerPath: "revenueExpenseRatioApi",
  endpoint: "REVENUE_EXPENSE_RATIO",
  tagType: "RevenueExpenseRatio",
});

const hasNoData = (
  response: BaseMetricResponse<RevenueExpenseRatioMetricData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  return (
    response.metric_data.revenue === 0 && response.metric_data.expenses === 0
  );
};

const { useGetDataQuery } = apiSlice;

const revenueExpenseRatio = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default revenueExpenseRatio;
