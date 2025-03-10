import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";

interface ClientsMetricsResponse {
  total_clients: number;
}

interface GetClientsMetricsArgs {
  startDate: string | null;
  endDate: string | null;
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
      query: ({ startDate, endDate }) => ({
        url: API_ENDPOINTS.METRICS.CLIENTS,
        params: {
          start_date: startDate,
          end_date: endDate,
        },
      }),
      providesTags: ["ClientsMetrics"],
    }),
  }),
});

export const { useGetClientsMetricsQuery } = clientsMetricsApiSlice;
