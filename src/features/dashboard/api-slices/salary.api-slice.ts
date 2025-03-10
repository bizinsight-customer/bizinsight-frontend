import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";

export interface SalaryMetricsResponse {
  total_salary_sum: number;
  number_of_workers: number;
}

export const salaryApiSlice = createApiSliceNonJsonApi({
  reducerPath: "salaryApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getSalaryMetrics: builder.query<
      SalaryMetricsResponse,
      { start_date: string; end_date: string }
    >({
      query: ({ start_date, end_date }) => ({
        url: API_ENDPOINTS.METRICS.SALARY,
        method: "GET",
        params: {
          start_date,
          end_date,
        },
      }),
    }),
  }),
});

export const { useGetSalaryMetricsQuery } = salaryApiSlice;
