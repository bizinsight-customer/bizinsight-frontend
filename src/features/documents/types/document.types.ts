export interface DocumentTypeAttributes {
  name: string;
  value: string;
}

export interface DocumentType {
  id: string;
  type: "document_type";
  attributes: DocumentTypeAttributes;
  relationships: null;
  meta: null;
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

// Document Data Interface
export type DocumentData = Record<string, string>;

// Base Document Interface
export interface Document {
  id: string;
  document_date: string;
  amount: number;
  file_name: string;
  updated_at: string;
  created_at: string;
  document_type: string;
  currency: string;
  description?: string;
  user_id: string;
  file_path: string;
  file_type: string;
  document_data: DocumentData;
  recipient_company: CompanyBase;
  issuer_company: CompanyBase;
  metadata?: Record<string, unknown>;
}

export type RecognizedValuePrimitive = string | number | boolean | null;
export type RecognizedValue =
  | RecognizedValuePrimitive
  | Record<
      string,
      RecognizedValuePrimitive | Record<string, RecognizedValuePrimitive>
    >;

export interface DocumentRecognitionResponse {
  document_type: DocumentType;
  extracted_data: Record<string, RecognizedValue>;
  metadata?: Record<string, unknown>;
}

export type DocumentFields = Record<string, string>;

export interface DocumentCreationPayload {
  file: File;
  type: string;
  title: string;
  description?: string;
  fields: DocumentFields;
}

// Recognized Data Type - generic structure that can hold any nested data
export type RecognizedData = Record<string, RecognizedValue>;
