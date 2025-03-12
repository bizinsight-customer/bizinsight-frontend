/**
 * @deprecated These types are deprecated. Please use types from src/types/api-updated.types.ts instead.
 * This file will be removed in future versions.
 */

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}
