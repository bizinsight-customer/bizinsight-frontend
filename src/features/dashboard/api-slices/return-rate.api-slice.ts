import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { DocumentInfo } from "@/types/api-updated.types";

export interface ReturnRateResponse {
  data: {
    return_rate: number;
    total_returns: number;
    total_sales: number;
    documents: DocumentInfo[];
    summary: string;
  };
  meta: {
    start_date: string;
    end_date: string;
  };
}

export interface GetReturnRateParams {
  start_date: string;
  end_date: string;
}

export const returnRateApi = createApiSliceNonJsonApi({
  reducerPath: "returnRateApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getReturnRate: builder.query<ReturnRateResponse, GetReturnRateParams>({
      query: ({ start_date, end_date }) => ({
        url: API_ENDPOINTS.METRICS.RETURN_RATE,
        method: "GET",
        params: {
          start_date,
          end_date,
        },
      }),
    }),
  }),
});

export const { useGetReturnRateQuery } = returnRateApi;
