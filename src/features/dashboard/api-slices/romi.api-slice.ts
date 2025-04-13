import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface ROMIMetricData extends BaseMetricData {
  revenue: number;
  marketing_budget: number;
  romi_percentage: number;
  romi_ratio: number;
}

const apiSlice = createMetricApiSlice<ROMIMetricData>({
  reducerPath: "romiApi",
  endpoint: "ROMI",
  tagType: "ROMI",
});

const hasNoData = (
  response: BaseMetricResponse<ROMIMetricData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  return (
    response.metric_data.revenue === 0 &&
    response.metric_data.marketing_budget === 0
  );
};

const { useGetDataQuery } = apiSlice;

const romi = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default romi;
