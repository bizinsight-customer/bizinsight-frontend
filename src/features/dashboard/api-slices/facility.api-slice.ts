import { Currency } from "@/types/currency.types";
import { BalanceChangeType, DocumentType } from "@/types/document.types";
import { BaseMetricData, BaseMetricResponse } from "@/types/metrics.types";
import { createMetricApiSlice } from "../utils/create-metric-api-slice";

export interface DailyAmount extends BaseMetricData {
  date: string;
  amount: number;
}

export interface DocumentInfo {
  id: string;
  document_type: DocumentType;
  amount: number;
  currency: Currency;
  converted_amount: number;
  converted_currency: Currency;
  document_date: string;
  balance_change_type: BalanceChangeType;
  is_sale_document: boolean;
  description?: string | null;
  original_file_name?: string | null;
}

export interface FacilityChargesData extends BaseMetricData {
  water: DailyAmount[];
  electricity: DailyAmount[];
  rent: DailyAmount[];
  other: DailyAmount[];
  total_water: number;
  total_electricity: number;
  total_rent: number;
  total_other: number;
}

export interface FacilityMetricData extends BaseMetricData {
  current_period: FacilityChargesData;
  previous_period: FacilityChargesData | null;
}

export type FacilityResponse = BaseMetricResponse<FacilityMetricData>;

const apiSlice = createMetricApiSlice<FacilityMetricData>({
  reducerPath: "facilityApi",
  endpoint: "FACILITY",
  tagType: "Facility",
});

const hasNoData = (response: FacilityResponse | undefined): boolean => {
  if (!response?.metric_data?.current_period) {
    return true;
  }
  const { total_water, total_electricity, total_rent, total_other } =
    response.metric_data.current_period;
  return (
    total_water === 0 &&
    total_electricity === 0 &&
    total_rent === 0 &&
    total_other === 0
  );
};

const { useGetDataQuery } = apiSlice;

const facility = {
  apiSlice,
  hasNoData,
  useGetDataQuery,
};

export default facility;
