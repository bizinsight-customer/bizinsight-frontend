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
export interface Company {
  name?: string;
  email?: string;
  phone?: string;
  tax_number?: string;
  registration_number?: string;
  legal_address?: string;
  postal_address?: string;
  bank_name?: string;
  bank_account?: string;
  bank_swift?: string;
  website?: string;
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
  issuer_company?: Company;
  document_data: DocumentData;
  recipient_company?: Company;
}

// Base Document Interface
export interface Document {
  document_type: string;
  file_name: string;
  file_type: string;
  file_path?: string;
  amount: string | number;
  currency: string;
  document_date: string;
  created_at: string;
  updated_at: string;
  description: string;
  issuer_company?: Company;
  recipient_company?: Company;
  document_data?: Record<string, unknown>;
  metadata?: Record<string, unknown>;
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
