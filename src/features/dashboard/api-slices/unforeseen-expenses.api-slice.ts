import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface UnforeseenExpensesMetricData extends BaseMetricData {
  unforeseen_expenses: number;
  total_expenses: number;
}

const apiSlice = createMetricApiSlice<UnforeseenExpensesMetricData>({
  reducerPath: "unforeseenExpensesApi",
  endpoint: "UNFORESEEN_EXPENSES",
  tagType: "UnforeseenExpenses",
});

const hasNoData = (
  response: BaseMetricResponse<UnforeseenExpensesMetricData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  return (
    response.metric_data.unforeseen_expenses === 0 &&
    response.metric_data.total_expenses === 0
  );
};

const { useGetDataQuery } = apiSlice;

const unforeseenExpenses = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default unforeseenExpenses;
