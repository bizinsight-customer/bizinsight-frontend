import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface ClientsMetricsData extends BaseMetricData {
  total_clients: number;
}

const apiSlice = createMetricApiSlice<ClientsMetricsData>({
  reducerPath: "clientsMetricsApi",
  endpoint: "CLIENTS",
  tagType: "ClientsMetrics",
});

const hasNoData = (
  response: BaseMetricResponse<ClientsMetricsData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  return response.metric_data.total_clients === 0;
};

const { useGetDataQuery } = apiSlice;

const clientsMetrics = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default clientsMetrics;
