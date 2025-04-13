import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface SalaryMetricData extends BaseMetricData {
  total_amount: number;
  number_of_workers: number;
}

const apiSlice = createMetricApiSlice<SalaryMetricData>({
  reducerPath: "salaryApi",
  endpoint: "SALARY",
  tagType: "Salary",
});

const hasNoData = (
  response: BaseMetricResponse<SalaryMetricData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  return (
    response.metric_data.total_amount === 0 &&
    response.metric_data.number_of_workers === 0
  );
};

const { useGetDataQuery } = apiSlice;

const salary = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default salary;
