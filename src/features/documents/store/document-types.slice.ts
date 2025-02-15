import { API_ENDPOINTS } from "@/config/api";
import { axiosBaseQuery } from "@/services/api/axios-base-query";
import { JsonApiCollectionResponse } from "@/types/json-api.types";
import { createApi } from "@reduxjs/toolkit/query/react";
import { DocumentType } from "../types/document.types";

export const documentTypesApi = createApi({
  reducerPath: "documentTypesApi",
  baseQuery: axiosBaseQuery(),
  endpoints: (builder) => ({
    getDocumentTypes: builder.query<DocumentType[], void>({
      query: () => ({
        url: API_ENDPOINTS.DOCUMENTS.GET_TYPES,
      }),
      transformResponse: (
        response: JsonApiCollectionResponse<DocumentType>
      ) => {
        return response.data;
      },
    }),
  }),
});

export const { useGetDocumentTypesQuery } = documentTypesApi;
