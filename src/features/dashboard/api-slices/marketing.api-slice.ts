import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { DocumentInfo } from "@/types/api-updated.types";

export interface MarketingMetricsResponse {
  marketing_expenses: number;
  total_income: number;
  documents: DocumentInfo[];
  summary: string;
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
