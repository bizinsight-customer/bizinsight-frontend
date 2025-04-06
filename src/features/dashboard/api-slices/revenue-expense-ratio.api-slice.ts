import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { DocumentInfo } from "@/types/api-updated.types";

export interface RevenueExpenseRatioResponse {
  data: {
    revenue: number;
    expenses: number;
    revenue_percent: number;
    expenses_percent: number;
    documents: DocumentInfo[];
    summary: string;
  };
  meta: {
    start_date: string;
    end_date: string;
  };
}

export interface GetRevenueExpenseRatioParams {
  start_date: string;
  end_date: string;
}

export const revenueExpenseRatioApi = createApiSliceNonJsonApi({
  reducerPath: "revenueExpenseRatioApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getRevenueExpenseRatio: builder.query<
      RevenueExpenseRatioResponse,
      GetRevenueExpenseRatioParams
    >({
      query: ({ start_date, end_date }) => ({
        url: API_ENDPOINTS.METRICS.REVENUE_EXPENSE_RATIO,
        method: "GET",
        params: {
          start_date,
          end_date,
        },
      }),
    }),
  }),
});

export const { useGetRevenueExpenseRatioQuery } = revenueExpenseRatioApi;
