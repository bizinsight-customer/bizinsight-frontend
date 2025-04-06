import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import {
  BalanceChangeType,
  Currency,
  DocumentType,
} from "@/types/api-updated.types";

export interface DocumentHistoryItem {
  id: string;
  document_type: DocumentType;
  file_name: string | null;
  file_type: string | null;
  amount: number;
  currency: Currency;
  converted_amount: number;
  converted_currency: Currency;
  document_date: string;
  balance_change_type: BalanceChangeType;
  is_sale_document: boolean;
  description: string | null;
  original_file_name: string | null;
  created_at: string;
}

const apiSlice = createApiSliceNonJsonApi({
  reducerPath: "documentsHistoryApi",
});

export const documentsHistoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocumentsHistory: builder.query<
      DocumentHistoryItem[],
      { impersonated_uid?: string }
    >({
      query: ({ impersonated_uid }) => ({
        url: API_ENDPOINTS.DOCUMENTS.HISTORY,
        method: "GET",
        params: { impersonated_uid },
      }),
    }),
  }),
});

export const {
  getDocumentsHistory: { useQuery: useGetDocumentsHistoryQuery },
} = documentsHistoryApiSlice.endpoints;
