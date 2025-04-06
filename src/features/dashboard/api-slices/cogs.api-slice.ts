import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { DocumentInfo } from "@/types/api-updated.types";

export interface CogsPercentageResponse {
  data: {
    cogs_percentage: number;
    stock_procurement: number;
    revenue: number;
    documents: DocumentInfo[];
    summary: string;
  };
  meta: {
    start_date: string;
    end_date: string;
  };
}

export interface GetCogsParams {
  start_date: string;
  end_date: string;
}

export const cogsApi = createApiSliceNonJsonApi({
  reducerPath: "cogsApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getCogs: builder.query<CogsPercentageResponse, GetCogsParams>({
      query: ({ start_date, end_date }) => ({
        url: API_ENDPOINTS.METRICS.COGS,
        method: "GET",
        params: {
          start_date,
          end_date,
        },
      }),
    }),
  }),
});

export const { useGetCogsQuery } = cogsApi;
