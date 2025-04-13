import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface RevenueEntry extends BaseMetricData {
  date: string;
  amount: number;
}

export interface RevenuePeriodData extends BaseMetricData {
  total_revenue: number;
  entries: RevenueEntry[];
}

export interface RevenueMetricData extends BaseMetricData {
  current_period: RevenuePeriodData;
  previous_period: RevenuePeriodData;
}

const apiSlice = createMetricApiSlice<RevenueMetricData>({
  reducerPath: "revenueApi",
  endpoint: "REVENUE",
  tagType: "Revenue",
});

const hasNoData = (
  response: BaseMetricResponse<RevenueMetricData> | undefined
): boolean => {
  if (!response?.metric_data?.current_period) {
    return true;
  }
  return response.metric_data.current_period.total_revenue === 0;
};

const { useGetDataQuery } = apiSlice;

const revenue = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default revenue;
