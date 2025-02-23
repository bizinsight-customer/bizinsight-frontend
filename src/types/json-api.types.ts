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

// Generic type for JSON:API relationships
export interface JsonApiRelationship<T = unknown> {
  data: T extends Array<unknown>
    ? Array<{ id: string; type: string }>
    : { id: string; type: string } | null;
  links?: JsonApiLinks;
  meta?: JsonApiMeta;
}

// Generic type for JSON:API resource object
export interface JsonApiResource<
  TAttributes = unknown,
  TRelationships = Record<string, JsonApiRelationship>
> {
  id: string;
  type: string;
  attributes: TAttributes;
  relationships?: TRelationships;
  links?: JsonApiLinks;
  meta?: JsonApiMeta;
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
