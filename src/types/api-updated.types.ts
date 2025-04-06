export interface PaginationMeta {
  count: number;
  total_count: number;
  total_pages: number;
  current_page: number;
  per_page: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  meta: PaginationMeta;
}

export interface PaginationParams {
  page?: number;
  per_page?: number;
}

export enum DocumentType {
  INVOICE = "INVOICE",
  RECEIPT = "RECEIPT",
  BILL = "BILL",
  EXPENSE = "EXPENSE",
  SALARY = "SALARY",
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
}

export enum BalanceChangeType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
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
  description?: string;
  original_file_name: string;
}

export interface DocumentsResponse<T> extends PaginatedResponse<T> {
  documents: DocumentInfo[];
}
