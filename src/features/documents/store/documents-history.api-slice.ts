import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";

export type DocumentType =
  | "INVOICE"
  | "SALARY"
  | "FACILITY_CHARGES"
  | "PAYMENT_CONFIRMATION"
  | "TAX"
  | "MARKETING"
  | "LOGISTICS"
  | "REFUND"
  | "CUSTOMS"
  | "UNFORESEEN_EXPENSE"
  | "STOCK_PROCUREMENT"
  | "STOCK_PROCUREMENT_OTHER";

export interface DocumentHistoryItem {
  created_at: string;
  document_id: string;
  document_type: DocumentType;
  filename: string | null;
  file_type: string | null;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  per_page: number;
}

export type DocumentHistoryResponse = PaginatedResponse<DocumentHistoryItem>;

const apiSlice = createApiSliceNonJsonApi({
  reducerPath: "documentsHistoryApi",
});

export const documentsHistoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getDocumentsHistory: builder.query<
      DocumentHistoryResponse,
      { page?: number; per_page?: number }
    >({
      query: ({ page = 1, per_page = 50 }) => ({
        url: API_ENDPOINTS.DOCUMENTS.HISTORY,
        method: "GET",
        params: { page, per_page },
      }),
    }),
  }),
});

export const {
  getDocumentsHistory: { useQuery: useGetDocumentsHistoryQuery },
} = documentsHistoryApiSlice.endpoints;
