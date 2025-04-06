import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { DocumentInfo } from "@/types/api-updated.types";

export interface SalesMetricPeriod {
  period_start: string;
  period_end: string;
  number_of_sales: number;
}

export interface SalesMetricsResponse {
  periods: SalesMetricPeriod[];
  documents: DocumentInfo[];
  summary: string;
}

export const salesApi = createApiSliceNonJsonApi({
  reducerPath: "salesApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getSales: builder.query<
      SalesMetricsResponse,
      { start_date: string; end_date: string }
    >({
      query: ({ start_date, end_date }) => ({
        url: API_ENDPOINTS.METRICS.SALES,
        method: "GET",
        params: {
          start_date,
          end_date,
        },
      }),
    }),
  }),
});

export const { useGetSalesQuery } = salesApi;
