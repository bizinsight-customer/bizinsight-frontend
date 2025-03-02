import { axiosBaseQuery } from "@/services/api/axios-base-query";
import { axiosBaseQuery2Version } from "@/services/api/axios-base-query-2-version";
import { createApi } from "@reduxjs/toolkit/query/react";

interface CreateApiSliceOptions {
  reducerPath: string;
  tagTypes?: string[];
}

/**
 * Creates an API slice with pre-configured axios base query and standard settings
 * @param options Configuration options for the API slice
 * @returns Configured createApi instance
 */
export const createApiSlice = ({
  reducerPath,
  tagTypes = [],
}: CreateApiSliceOptions) => {
  return createApi({
    reducerPath,
    baseQuery: axiosBaseQuery(),
    tagTypes,
    endpoints: () => ({}),
  });
};

export const createApiSliceNonJsonApi = ({
  reducerPath,
  tagTypes = [],
}: CreateApiSliceOptions) => {
  return createApi({
    reducerPath,
    baseQuery: axiosBaseQuery2Version(),
    tagTypes,
    endpoints: () => ({}),
  });
};
