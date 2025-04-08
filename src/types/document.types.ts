import { PaginatedResponse } from "./api.types";
import { Currency } from "./currency.types";

export enum DocumentType {
  INVOICE = "INVOICE",
  SALARY = "SALARY",
  FACILITY_CHARGES = "FACILITY_CHARGES",
  PAYMENT_CONFIRMATION = "PAYMENT_CONFIRMATION",
  TAX = "TAX",
  MARKETING = "MARKETING",
  LOGISTICS = "LOGISTICS",
  REFUND = "REFUND",
  CUSTOMS = "CUSTOMS",
  UNFORESEEN_EXPENSE = "UNFORESEEN_EXPENSE",
  STOCK_PROCUREMENT = "STOCK_PROCUREMENT",
  STOCK_PROCUREMENT_OTHER = "STOCK_PROCUREMENT_OTHER",
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
