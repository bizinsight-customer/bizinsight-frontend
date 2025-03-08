import { createApiSliceNonJsonApi } from "../../../store/create-api-slice";
import {
  UserCompanyData,
  UserCompanyUpdateData,
} from "../types/user-company.types";

export const userCompanyApiSlice = createApiSliceNonJsonApi({
  reducerPath: "userCompanyApi",
  tagTypes: ["UserCompany", "HasRequiredUserCompanyData"],
}).injectEndpoints({
  endpoints: (builder) => ({
    hasRequiredUserCompanyData: builder.query<boolean, void>({
      query: () => ({
        url: "/users/me/company/has-required-data",
        method: "GET",
      }),
      providesTags: ["HasRequiredUserCompanyData"],
    }),
    getUserCompanyData: builder.query<UserCompanyData, void>({
      query: () => ({
        url: "/users/me/company",
        method: "GET",
      }),
      providesTags: ["UserCompany"],
    }),
    updateUserCompanyData: builder.mutation<
      UserCompanyData,
      UserCompanyUpdateData
    >({
      query: (data) => ({
        url: "/users/me/company",
        method: "PUT",
        data: data,
      }),
      invalidatesTags: ["UserCompany", "HasRequiredUserCompanyData"],
    }),
  }),
});

export const {
  useHasRequiredUserCompanyDataQuery,
  useGetUserCompanyDataQuery,
  useUpdateUserCompanyDataMutation,
} = userCompanyApiSlice;
