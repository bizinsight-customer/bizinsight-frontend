import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface ExpenseCategoryEntry {
  category: string;
  amount: number;
}

export interface ExpenseCategoriesMetricData extends BaseMetricData {
  total_amount: number;
  categories: ExpenseCategoryEntry[];
}

const apiSlice = createMetricApiSlice<ExpenseCategoriesMetricData>({
  reducerPath: "expenseCategoriesApi",
  endpoint: "EXPENSE_CATEGORIES",
  tagType: "ExpenseCategories",
});

const hasNoData = (
  response: BaseMetricResponse<ExpenseCategoriesMetricData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  return response.metric_data.categories.length === 0;
};

const { useGetDataQuery } = apiSlice;

const expenseCategories = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default expenseCategories;
