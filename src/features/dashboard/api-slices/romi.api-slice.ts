import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { DocumentInfo } from "@/types/api-updated.types";

export interface ROMIResponse {
  data: {
    revenue: number;
    marketing_budget: number;
    romi_percentage: number;
    romi_ratio: number;
    documents: DocumentInfo[];
    summary: string;
  };
  meta: {
    start_date: string;
    end_date: string;
  };
}

export interface GetROMIParams {
  start_date: string;
  end_date: string;
}

export const romiApi = createApiSliceNonJsonApi({
  reducerPath: "romiApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getROMI: builder.query<ROMIResponse, GetROMIParams>({
      query: ({ start_date, end_date }) => ({
        url: API_ENDPOINTS.METRICS.ROMI,
        method: "GET",
        params: {
          start_date,
          end_date,
        },
      }),
    }),
  }),
});

export const { useGetROMIQuery } = romiApi;
