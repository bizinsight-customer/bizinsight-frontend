import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface ReturnRateMetricData extends BaseMetricData {
  return_rate: number;
  total_returns: number;
  total_sales: number;
}

const apiSlice = createMetricApiSlice<ReturnRateMetricData>({
  reducerPath: "returnRateApi",
  endpoint: "RETURN_RATE",
  tagType: "ReturnRate",
});

const hasNoData = (
  response: BaseMetricResponse<ReturnRateMetricData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  return (
    response.metric_data.return_rate === 0 &&
    response.metric_data.total_returns === 0 &&
    response.metric_data.total_sales === 0
  );
};

const { useGetDataQuery } = apiSlice;

const returnRate = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default returnRate;
