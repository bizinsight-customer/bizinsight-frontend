import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "../../../store/create-api-slice";

export interface RevenueEntry {
  date: string;
  amount: number;
}

export interface RevenuePeriodData {
  total: number;
  entries: RevenueEntry[];
}

export interface RevenueResponse {
  current_period: RevenuePeriodData;
  previous_period: RevenuePeriodData;
}

export interface GetRevenueParams {
  start_date: string;
  end_date: string;
}

export const revenueApi = createApiSliceNonJsonApi({
  reducerPath: "revenueApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getRevenue: builder.query<RevenueResponse, GetRevenueParams>({
      query: ({ start_date, end_date }) => ({
        url: API_ENDPOINTS.METRICS.REVENUE,
        method: "GET",
        params: { start_date, end_date },
      }),
    }),
  }),
});

export const { useGetRevenueQuery } = revenueApi;
