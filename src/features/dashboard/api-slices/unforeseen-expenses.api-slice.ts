import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";

export interface UnforeseenExpensesResponse {
  unforeseen_expenses: number;
  total_expenses: number;
}

export interface UnforeseenExpensesParams {
  start_date: string;
  end_date: string;
}

export const unforeseenExpensesApiSlice = createApiSliceNonJsonApi({
  reducerPath: "unforeseenExpensesApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getUnforeseenExpenses: builder.query<
      UnforeseenExpensesResponse,
      UnforeseenExpensesParams
    >({
      query: (params) => ({
        url: API_ENDPOINTS.METRICS.UNFORESEEN_EXPENSES,
        method: "GET",
        params,
      }),
    }),
  }),
});

export const { useGetUnforeseenExpensesQuery } = unforeseenExpensesApiSlice;
