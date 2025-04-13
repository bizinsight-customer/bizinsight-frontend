import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface AverageTicketEntry extends BaseMetricData {
  start_date: string;
  end_date: string;
  revenue: number;
  document_count: number;
  average_ticket: number;
}

export interface AverageTicketMetricData extends BaseMetricData {
  periods: AverageTicketEntry[];
}

const apiSlice = createMetricApiSlice<AverageTicketMetricData>({
  reducerPath: "averageTicketApi",
  endpoint: "AVERAGE_TICKET",
  tagType: "AverageTicket",
});

const hasNoData = (
  response: BaseMetricResponse<AverageTicketMetricData> | undefined
): boolean => {
  if (!response?.metric_data) {
    return true;
  }
  return response.metric_data.periods.every(
    (period) => period.revenue === 0 && period.document_count === 0
  );
};

const { useGetDataQuery } = apiSlice;

const averageTicket = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default averageTicket;
