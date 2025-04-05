import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { DocumentInfo } from "@/types/api-updated.types";

export interface UnforeseenExpensesResponse {
  unforeseen_expenses: number;
  total_expenses: number;
  documents: DocumentInfo[];
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
