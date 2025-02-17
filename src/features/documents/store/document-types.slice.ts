import { API_ENDPOINTS } from "@/config/api";
import { createApiSlice } from "@/store/create-api-slice";
import { DocumentType } from "../types/document.types";

export const documentTypesApi = createApiSlice({
  reducerPath: "documentTypesApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getDocumentTypes: builder.query<DocumentType[], void>({
      query: () => ({
        url: API_ENDPOINTS.DOCUMENTS.GET_TYPES,
      }),
    }),
  }),
});

export const { useGetDocumentTypesQuery } = documentTypesApi;
