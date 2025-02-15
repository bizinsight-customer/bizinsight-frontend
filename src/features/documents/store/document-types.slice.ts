import { API_ENDPOINTS } from "@/config/api";
import { createApiSlice } from "@/store/create-api-slice";
import { JsonApiCollectionResponse } from "@/types/json-api.types";
import { DocumentType } from "../types/document.types";

export const documentTypesApi = createApiSlice({
  reducerPath: "documentTypesApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getDocumentTypes: builder.query<DocumentType[], void>({
      query: () => ({
        url: API_ENDPOINTS.DOCUMENTS.GET_TYPES,
      }),
      transformResponse: (
        response: JsonApiCollectionResponse<DocumentType>
      ) => {
        console.log("RESPONSE", response);
        return response.data;
      },
    }),
  }),
});

export const { useGetDocumentTypesQuery } = documentTypesApi;
