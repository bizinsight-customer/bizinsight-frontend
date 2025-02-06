export interface Document {
  id: string;
  title: string;
  type: DocumentType;
  createdAt: string;
  updatedAt: string;
  status: DocumentStatus;
  description?: string;
  fileSize: number;
  fileType: string;
}

export enum DocumentType {
  INVOICE = "INVOICE",
  RECEIPT = "RECEIPT",
  CONTRACT = "CONTRACT",
  REPORT = "REPORT",
  OTHER = "OTHER",
}

export enum DocumentStatus {
  PROCESSING = "PROCESSING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export interface DocumentsResponse {
  data: Document[];
  meta: {
    total: number;
    page: number;
    perPage: number;
  };
}
