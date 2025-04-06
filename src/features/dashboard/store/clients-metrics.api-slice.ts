import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { DocumentInfo } from "@/types/api-updated.types";

interface ClientsMetricsResponse {
  total_clients: number;
  documents: DocumentInfo[];
}

interface GetClientsMetricsArgs {
  start_date: string;
  end_date: string;
  previous_start_date?: string;
  previous_end_date?: string;
}

export const clientsMetricsApiSlice = createApiSliceNonJsonApi({
  reducerPath: "clientsMetricsApi",
  tagTypes: ["ClientsMetrics"],
}).injectEndpoints({
  endpoints: (builder) => ({
    getClientsMetrics: builder.query<
      ClientsMetricsResponse,
      GetClientsMetricsArgs
    >({
      query: ({
        start_date,
        end_date,
        previous_start_date,
        previous_end_date,
      }) => ({
        url: API_ENDPOINTS.METRICS.CLIENTS,
        params: {
          start_date,
          end_date,
          ...(previous_start_date && { previous_start_date }),
          ...(previous_end_date && { previous_end_date }),
        },
      }),
      providesTags: ["ClientsMetrics"],
    }),
  }),
});

export const { useGetClientsMetricsQuery } = clientsMetricsApiSlice;
