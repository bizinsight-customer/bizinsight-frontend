import {
  JsonApiCollectionResponse,
  JsonApiMeta,
  JsonApiResponse,
  JsonApiSingleResponse,
} from "@/types/json-api.types";
import { AxiosResponse } from "axios";

export function extractData<T>(response: AxiosResponse<JsonApiResponse<T>>): T {
  return response.data.data;
}

export function extractCollectionData<T>(
  response: AxiosResponse<JsonApiCollectionResponse<T>>
): T[] {
  return response.data.data;
}

export function extractSingleData<T>(
  response: AxiosResponse<JsonApiSingleResponse<T>>
): T {
  return response.data.data;
}

export function extractMeta(
  response: AxiosResponse<JsonApiResponse<unknown>>
): JsonApiMeta | undefined {
  return response.data.meta;
}

export function getPaginationInfo(meta?: JsonApiMeta) {
  if (!meta) return null;

  return {
    totalPages: meta.totalPages,
    currentPage: meta.currentPage,
    totalItems: meta.totalItems,
    itemsPerPage: meta.itemsPerPage,
  };
}

// Type guard to check if response is a collection
export function isCollectionResponse<T>(
  response: AxiosResponse<JsonApiResponse<T | T[]>>
): response is AxiosResponse<JsonApiCollectionResponse<T>> {
  return Array.isArray(response.data.data);
}

// Type guard to check if response is a single resource
export function isSingleResponse<T>(
  response: AxiosResponse<JsonApiResponse<T | T[]>>
): response is AxiosResponse<JsonApiSingleResponse<T>> {
  return !Array.isArray(response.data.data);
}
