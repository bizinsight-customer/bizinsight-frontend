import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import {
  AIAnalyticsReportResponse,
  GetAIAnalyticsRequest,
} from "../types/ai-analytics.types";

export const aiAnalyticsApiSlice = createApiSliceNonJsonApi({
  reducerPath: "aiAnalyticsApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getReport: builder.mutation<
      AIAnalyticsReportResponse,
      GetAIAnalyticsRequest
    >({
      query: (request) => ({
        url: API_ENDPOINTS.AI_ANALYTICS.REPORT,
        method: "POST",
        data: request,
      }),
    }),
  }),
});

export const { useGetReportMutation } = aiAnalyticsApiSlice;
