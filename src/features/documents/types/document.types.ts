import {
  DocumentFields,
  RecognizedValue,
} from "../pages/DocumentRecognition/document-recognition.types";

export interface DocumentTypeField {
  title: string;
  type: string;
}

export interface DocumentType {
  name: string;
  value: string;
  description: string;
  fields: Record<string, DocumentTypeField>;
}

// Company Information
export interface CompanyBase {
  name: string;
  phone?: string;
  tax_number?: string;
  registration_number?: string;
  legal_address?: string;
  postal_address?: string;
  email?: string;
  bank_name?: string;
  bank_account?: string;
  bank_swift?: string;
  website?: string;
  description?: string;
}

// Document Data Interface
export type DocumentData = Record<string, string>;

// Document Attributes Interface
export interface DocumentAttributes {
  description?: string;
  user_id: string;
  file_type: string | null;
  file_name: string | null;
  document_type: string;
  updated_at: string;
  amount: number;
  document_date: string;
  file_path: string | null;
  currency: string;
  created_at: string;
  issuer_company: CompanyBase;
  document_data: DocumentData;
  recipient_company: CompanyBase;
}

// Base Document Interface
export interface Document {
  id: string;
  type: "documents";
  attributes: DocumentAttributes;
}

export interface DocumentRecognitionResponse {
  document_type: string;
  extracted_data: Record<string, RecognizedValue>;
  metadata?: Record<string, unknown>;
}

export interface DocumentCreationPayload {
  file: File;
  type: string;
  title: string;
  description?: string;
  fields: DocumentFields;
}
