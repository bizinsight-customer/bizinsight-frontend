import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface StockProcurementMetricData extends BaseMetricData {
  stock_procurement: number;
  customs: number;
  logistics: number;
  stock_procurement_other: number;
}

const apiSlice = createMetricApiSlice<StockProcurementMetricData>({
  reducerPath: "stockProcurementApi",
  endpoint: "STOCK_PROCUREMENT",
  tagType: "StockProcurement",
});

const hasNoData = (
  response: BaseMetricResponse<StockProcurementMetricData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  const { stock_procurement, customs, logistics, stock_procurement_other } =
    response.metric_data;
  return (
    stock_procurement === 0 &&
    customs === 0 &&
    logistics === 0 &&
    stock_procurement_other === 0
  );
};

const { useGetDataQuery } = apiSlice;

const stockProcurement = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default stockProcurement;
