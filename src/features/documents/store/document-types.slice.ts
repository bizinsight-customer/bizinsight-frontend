import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import { DocumentType } from "../types/document.types";

type DocumentTypesResponse = {
  data: DocumentType[];
};

export const documentTypesApi = createApiSliceNonJsonApi({
  reducerPath: "documentTypesApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getDocumentTypes: builder.query<DocumentType[], void>({
      query: () => ({
        url: API_ENDPOINTS.DOCUMENTS.GET_TYPES,
      }),
      transformResponse: (response: DocumentTypesResponse) => response.data,
    }),
  }),
});

export const { useGetDocumentTypesQuery } = documentTypesApi;
