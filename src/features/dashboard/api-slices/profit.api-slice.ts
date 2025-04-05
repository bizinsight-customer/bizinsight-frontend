import { API_ENDPOINTS } from "@/config/api";
import { DocumentInfo } from "@/types/api-updated.types";
import { createApiSliceNonJsonApi } from "../../../store/create-api-slice";

export interface ProfitEntry {
  date: string;
  revenue: number;
  expenses: number;
  profit: number;
}

export interface ProfitPeriodData {
  total: number;
  entries: ProfitEntry[];
}

export interface ProfitResponse {
  current_period: ProfitPeriodData;
  previous_period: ProfitPeriodData;
  documents: DocumentInfo[];
}

export interface GetProfitParams {
  start_date: string;
  end_date: string;
  previous_start_date?: string;
  previous_end_date?: string;
}

export const profitApi = createApiSliceNonJsonApi({
  reducerPath: "profitApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getProfit: builder.query<ProfitResponse, GetProfitParams>({
      query: ({
        start_date,
        end_date,
        previous_start_date,
        previous_end_date,
      }) => ({
        url: API_ENDPOINTS.METRICS.PROFIT,
        method: "GET",
        params: {
          start_date,
          end_date,
          ...(previous_start_date && { previous_start_date }),
          ...(previous_end_date && { previous_end_date }),
        },
      }),
    }),
  }),
});

export const { useGetProfitQuery } = profitApi;
