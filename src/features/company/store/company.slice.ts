import { createApiSliceNonJsonApi } from "../../../store/create-api-slice";
import { CompanyData, CompanyUpdateData } from "../types/company.types";

export const companyApiSlice = createApiSliceNonJsonApi({
  reducerPath: "companyApi",
  tagTypes: ["Company", "HasRequiredCompanyData"],
}).injectEndpoints({
  endpoints: (builder) => ({
    hasRequiredCompanyData: builder.query<boolean, void>({
      query: () => ({
        url: "/users/me/company/has-required-data",
        method: "GET",
      }),
      providesTags: ["HasRequiredCompanyData"],
    }),
    getCompanyData: builder.query<CompanyData, void>({
      query: () => ({
        url: "/users/me/company",
        method: "GET",
      }),
      providesTags: ["Company"],
    }),
    updateCompanyData: builder.mutation<CompanyData, CompanyUpdateData>({
      query: (data) => ({
        url: "/users/me/company",
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["Company", "HasRequiredCompanyData"],
    }),
  }),
});

export const {
  useHasRequiredCompanyDataQuery,
  useGetCompanyDataQuery,
  useUpdateCompanyDataMutation,
} = companyApiSlice;
