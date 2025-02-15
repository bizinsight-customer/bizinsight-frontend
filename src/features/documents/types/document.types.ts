export enum DocumentStatus {
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export type DocumentType = string;

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
export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  status: DocumentStatus;
  amount: number;
  currency: string;
  description?: string;
  metadata?: Record<string, unknown>;
  document_date: string;
  issuer_company: CompanyBase;
  recipient_company: CompanyBase;
  size: number;
  created_at: string;
  updated_at: string;
}

export interface DocumentRecognitionResponse {
  document_type: DocumentType;
  extracted_data: Record<string, string>;
  metadata?: Record<string, unknown>;
}

export interface DocumentField {
  name: string;
  type: string;
  value: string;
}

export interface DocumentCreationPayload {
  file: File;
  type: string;
  title: string;
  description?: string;
  fields: DocumentField[];
}
