import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface CogsMetricData extends BaseMetricData {
  cogs_percentage: number;
  stock_procurement: number;
  revenue: number;
}

const apiSlice = createMetricApiSlice<CogsMetricData>({
  reducerPath: "cogsApi",
  endpoint: "COGS",
  tagType: "Cogs",
});

const hasNoData = (
  response: BaseMetricResponse<CogsMetricData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  return (
    response.metric_data.cogs_percentage === 0 &&
    response.metric_data.stock_procurement === 0 &&
    response.metric_data.revenue === 0
  );
};

const { useGetDataQuery } = apiSlice;

const cogs = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default cogs;
