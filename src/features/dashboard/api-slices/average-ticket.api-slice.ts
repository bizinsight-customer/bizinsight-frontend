import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { DocumentInfo } from "@/types/api-updated.types";

export interface AverageTicketEntry {
  start_date: string;
  end_date: string;
  revenue: number;
  document_count: number;
  average_ticket: number;
}

export interface AverageTicketResponse {
  data: {
    periods: AverageTicketEntry[];
    documents: DocumentInfo[];
    summary: string;
  };
  meta: {
    start_date: string;
    end_date: string;
  };
}

export interface GetAverageTicketParams {
  start_date: string;
  end_date: string;
}

export const averageTicketApi = createApiSliceNonJsonApi({
  reducerPath: "averageTicketApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getAverageTicket: builder.query<
      AverageTicketResponse,
      GetAverageTicketParams
    >({
      query: ({ start_date, end_date }) => ({
        url: API_ENDPOINTS.METRICS.AVERAGE_TICKET,
        method: "GET",
        params: {
          start_date,
          end_date,
        },
      }),
    }),
  }),
});

export const { useGetAverageTicketQuery } = averageTicketApi;
