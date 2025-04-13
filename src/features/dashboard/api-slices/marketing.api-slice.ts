import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface MarketingMetricData extends BaseMetricData {
  marketing_expenses: number;
  total_income: number;
  marketing_percentage: number;
}

const apiSlice = createMetricApiSlice<MarketingMetricData>({
  reducerPath: "marketingApi",
  endpoint: "MARKETING",
  tagType: "Marketing",
});

const hasNoData = (
  response: BaseMetricResponse<MarketingMetricData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  return (
    response.metric_data.marketing_expenses === 0 &&
    response.metric_data.total_income === 0 &&
    response.metric_data.marketing_percentage === 0
  );
};

const { useGetDataQuery } = apiSlice;

const marketing = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default marketing;
