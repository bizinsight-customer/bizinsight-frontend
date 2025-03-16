import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";

interface MarketingMetricsResponse {
  marketing_expenses: number;
  total_income: number;
}

export const marketingApiSlice = createApiSliceNonJsonApi({
  reducerPath: "marketingApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getMarketingMetrics: builder.query<
      MarketingMetricsResponse,
      { start_date: string; end_date: string }
    >({
      query: (params) => ({
        url: API_ENDPOINTS.METRICS.MARKETING,
        params,
      }),
    }),
  }),
});

export const { useGetMarketingMetricsQuery } = marketingApiSlice;
