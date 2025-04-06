import { API_ENDPOINTS } from "@/config/api";
import { DocumentInfo } from "@/types/api-updated.types";
import { createApiSliceNonJsonApi } from "../../../store/create-api-slice";

export interface ExpenseCategoryEntry {
  category: string;
  amount: number;
}

export interface ExpenseCategoriesResponse {
  total_amount: number;
  categories: ExpenseCategoryEntry[];
  documents: DocumentInfo[];
  summary: string;
}

export interface GetExpenseCategoriesParams {
  start_date: string;
  end_date: string;
}

export const expenseCategoriesApi = createApiSliceNonJsonApi({
  reducerPath: "expenseCategoriesApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getExpenseCategories: builder.query<
      ExpenseCategoriesResponse,
      GetExpenseCategoriesParams
    >({
      query: ({ start_date, end_date }) => ({
        url: API_ENDPOINTS.METRICS.EXPENSE_CATEGORIES,
        method: "GET",
        params: {
          start_date,
          end_date,
        },
      }),
    }),
  }),
});

export const { useGetExpenseCategoriesQuery } = expenseCategoriesApi;
