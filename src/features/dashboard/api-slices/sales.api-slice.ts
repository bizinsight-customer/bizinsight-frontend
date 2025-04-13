import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface SalesPeriodEntry extends BaseMetricData {
  start_date: string;
  end_date: string;
  count: number;
}

export interface SalesMetricData extends BaseMetricData {
  periods: SalesPeriodEntry[];
}

const apiSlice = createMetricApiSlice<SalesMetricData>({
  reducerPath: "salesApi",
  endpoint: "SALES",
  tagType: "Sales",
});

const hasNoData = (
  response: BaseMetricResponse<SalesMetricData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  return response.metric_data.periods.every((period) => period.count === 0);
};

const { useGetDataQuery } = apiSlice;

const sales = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default sales;
