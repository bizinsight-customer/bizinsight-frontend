export interface JsonApiError {
  id?: string;
  links?: {
    about?: string;
  };
  status?: string;
  code?: string;
  title?: string;
  detail?: string;
  source?: {
    pointer?: string;
    parameter?: string;
  };
  meta?: Record<string, unknown>;
}

export interface JsonApiMeta {
  totalPages?: number;
  currentPage?: number;
  totalItems?: number;
  itemsPerPage?: number;
  [key: string]: unknown;
}

export interface JsonApiLinks {
  self?: string;
  first?: string;
  last?: string;
  prev?: string;
  next?: string;
  related?: string;
}

export interface JsonApiResponse<T> {
  data: T;
  included?: unknown[];
  meta?: JsonApiMeta;
  links?: JsonApiLinks;
  errors?: JsonApiError[];
}

// Helper type for single resource responses
export type JsonApiSingleResponse<T> = JsonApiResponse<T>;

// Helper type for collection responses
export type JsonApiCollectionResponse<T> = JsonApiResponse<T[]>;

// Helper type for empty responses (like DELETE operations)
export type JsonApiEmptyResponse = JsonApiResponse<null>;

// Helper type for error responses
export type JsonApiErrorResponse = Pick<
  JsonApiResponse<never>,
  "errors" | "meta"
>;
