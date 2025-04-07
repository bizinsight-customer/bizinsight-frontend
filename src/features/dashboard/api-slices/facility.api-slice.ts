import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { BalanceChangeType, Currency, DocumentType } from "@/types/api.types";

export interface DailyAmount {
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

export interface FacilityChargesData {
  water: DailyAmount[];
  electricity: DailyAmount[];
  rent: DailyAmount[];
  other: DailyAmount[];
  total_water: number;
  total_electricity: number;
  total_rent: number;
  total_other: number;
}

export interface FacilityChargesResponse {
  current_period: FacilityChargesData;
  previous_period: FacilityChargesData | null;
  documents: DocumentInfo[];
  summary: string;
}

export interface GetFacilityChargesParams {
  start_date: string;
  end_date: string;
  previous_start_date?: string;
  previous_end_date?: string;
}

export const facilityApiSlice = createApiSliceNonJsonApi({
  reducerPath: "facilityApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getFacilityCharges: builder.query<
      FacilityChargesResponse,
      GetFacilityChargesParams
    >({
      query: (params) => ({
        url: API_ENDPOINTS.METRICS.FACILITY,
        method: "GET",
        params: {
          start_date: params.start_date,
          end_date: params.end_date,
          ...(params.previous_start_date && {
            previous_start_date: params.previous_start_date,
          }),
          ...(params.previous_end_date && {
            previous_end_date: params.previous_end_date,
          }),
        },
      }),
    }),
  }),
});

export const { useGetFacilityChargesQuery } = facilityApiSlice;
