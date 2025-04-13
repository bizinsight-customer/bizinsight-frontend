import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import {
  BaseMetricData,
  BaseMetricResponse,
  MetricDateRangeArgs,
} from "@/types/metrics.types";

interface CreateMetricApiSliceOptions<TMetricData extends BaseMetricData> {
  reducerPath: string;
  endpoint: keyof typeof API_ENDPOINTS.METRICS;
  tagType: string;
}

export function createMetricApiSlice<TMetricData extends BaseMetricData>({
  reducerPath,
  endpoint,
  tagType,
}: CreateMetricApiSliceOptions<TMetricData>) {
  return createApiSliceNonJsonApi({
    reducerPath,
    tagTypes: [tagType],
  }).injectEndpoints({
    endpoints: (builder) => ({
      getData: builder.query<
        BaseMetricResponse<TMetricData>,
        MetricDateRangeArgs
      >({
        query: ({
          start_date,
          end_date,
          previous_start_date,
          previous_end_date,
        }) => ({
          url: API_ENDPOINTS.METRICS[endpoint],
          method: "GET",
          params: {
            start_date,
            end_date,
            ...(previous_start_date && { previous_start_date }),
            ...(previous_end_date && { previous_end_date }),
          },
        }),
        providesTags: [tagType],
      }),
    }),
  });
}
