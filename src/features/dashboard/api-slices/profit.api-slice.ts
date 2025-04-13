import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface ProfitEntry extends BaseMetricData {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface ProfitPeriodData extends BaseMetricData {
  total_revenue: number;
  total_expenses: number;
  total_profit: number;
  entries: ProfitEntry[];
}

export interface ProfitMetricData extends BaseMetricData {
  current_period: ProfitPeriodData;
  previous_period: ProfitPeriodData;
}

const apiSlice = createMetricApiSlice<ProfitMetricData>({
  reducerPath: "profitApi",
  endpoint: "PROFIT",
  tagType: "Profit",
});

const hasNoData = (
  response: BaseMetricResponse<ProfitMetricData> | undefined
): boolean => {
  if (!response?.metric_data?.current_period) {
    return true;
  }
  return (
    response.metric_data.current_period.total_revenue === 0 &&
    response.metric_data.current_period.total_expenses === 0 &&
    response.metric_data.current_period.total_profit === 0
  );
};

const { useGetDataQuery } = apiSlice;

const profit = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default profit;
