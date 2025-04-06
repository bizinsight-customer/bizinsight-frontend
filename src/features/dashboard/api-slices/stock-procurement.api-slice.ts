import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { DocumentInfo } from "@/types/api-updated.types";

export interface StockProcurementResponse {
  stock_procurement: number;
  customs: number;
  logistics: number;
  stock_procurement_other: number;
  documents: DocumentInfo[];
  summary: string;
}

interface StockProcurementParams {
  start_date: string;
  end_date: string;
}

export const stockProcurementApiSlice = createApiSliceNonJsonApi({
  reducerPath: "stockProcurementApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getStockProcurement: builder.query<
      StockProcurementResponse,
      StockProcurementParams
    >({
      query: (params) => ({
        url: API_ENDPOINTS.METRICS.STOCK_PROCUREMENT,
        params,
      }),
    }),
  }),
});

export const { useGetStockProcurementQuery } = stockProcurementApiSlice;
