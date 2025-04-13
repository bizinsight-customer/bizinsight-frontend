import { DocumentInfo } from "./document.types";

export interface MetricDateRangeArgs {
  start_date: string;
  end_date: string;
  previous_start_date?: string;
  previous_end_date?: string;
}

export type BaseMetricData = Record<string, unknown>;

export interface BaseMetricResponse<T extends BaseMetricData> {
  documents: DocumentInfo[];
  summary: string;
  metric_data: T;
}

// Specific metric data types
export interface ClientsMetricData extends BaseMetricData {
  total_clients: number;
}

export type ClientsMetricsResponse = BaseMetricResponse<ClientsMetricData>;
