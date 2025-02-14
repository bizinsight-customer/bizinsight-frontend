export interface Document {
  id: string;
  title: string;
  url: string;
  type: DocumentType;
  description?: string;
  status: DocumentStatus;
  userId: string;
  createdAt: string;
  updatedAt: string;
  metadata: {
    fileSize: number;
    fileType: string;
    pageCount?: number;
  };
}

export enum DocumentType {
  INVOICE = "INVOICE",
  CONTRACT = "CONTRACT",
  REPORT = "REPORT",
  RECEIPT = "RECEIPT",
  OTHER = "OTHER",
}

export enum DocumentStatus {
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface DocumentsResponse {
  data: Document[];
}

// Company Information
export interface CompanyBase {
  name: string;
  tax_number: string;
  registration_number: string;
  legal_address: string;
  postal_address?: string;
  email?: string;
  phone?: string;
  bank_name?: string;
  bank_account?: string;
  bank_swift?: string;
  website?: string;
  description?: string;
}

// Base Document Interface
interface DocumentBase {
  type: DocumentType;
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, unknown>;
  document_date: string;
  issuer_company: CompanyBase;
  recipient_company: CompanyBase;
}

// Specific Document Types
export interface InvoiceBase extends DocumentBase {
  invoice_number: string;
  due_date: string;
  payment_terms?: string;
  customer_id: string;
}

export interface PaymentConfirmationBase extends DocumentBase {
  transaction_id: string;
  payment_method: string;
  payment_reference?: string;
  original_invoice_number?: string;
}

export interface SalaryDocumentBase extends DocumentBase {
  employee_name: string;
  employee_id: string;
  period_start: string;
  period_end: string;
  payment_date: string;
  gross_amount: number;
  net_amount: number;
  deductions?: string;
}

export interface TaxDocumentBase extends DocumentBase {
  tax_period_start: string;
  tax_period_end: string;
  tax_type: string;
  payment_reference?: string;
  due_date: string;
}

export interface UtilityDocumentBase extends DocumentBase {
  service_type: string;
  service_period_start: string;
  service_period_end: string;
  due_date: string;
  meter_readings?: string;
}

export interface MarketingDocumentBase extends DocumentBase {
  campaign_name: string;
  service_type: string;
  campaign_details?: string;
  marketing_channel: string;
}

export interface OperationalDocumentBase extends DocumentBase {
  expense_type: string;
  receipt_number?: string;
  category: string;
  payment_method: string;
}

export interface LogisticsDocumentBase extends DocumentBase {
  shipment_number: string;
  service_type: string;
  origin: string;
  destination: string;
  tracking_number?: string;
  weight?: number;
}

export interface ReturnDocumentBase extends DocumentBase {
  return_reason?: string;
  original_transaction_id: string;
  product_details: string;
  refund_method: string;
}

export interface CustomsDocumentBase extends DocumentBase {
  declaration_number: string;
  customs_procedure: string;
  goods_description: string;
  country_of_origin: string;
  duty_amount: number;
}

export interface UnforeseenExpenseDocumentBase extends DocumentBase {
  expense_category: string;
  payment_method: string;
}

export type ExtractedDocumentData =
  | InvoiceBase
  | PaymentConfirmationBase
  | SalaryDocumentBase
  | TaxDocumentBase
  | UtilityDocumentBase
  | MarketingDocumentBase
  | OperationalDocumentBase
  | LogisticsDocumentBase
  | ReturnDocumentBase
  | CustomsDocumentBase
  | UnforeseenExpenseDocumentBase;

export interface DocumentRecognitionResponse {
  document_type: DocumentType;
  extracted_data: ExtractedDocumentData;
  metadata?: Record<string, unknown>;
}

export interface DocumentField {
  name: string;
  type: string;
  value: string;
}

export interface DocumentCreationPayload {
  file: File;
  type: DocumentType;
  title: string;
  description?: string;
  fields: DocumentField[];
}
