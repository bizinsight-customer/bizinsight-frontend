import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";
import {
  CurrencyInfo,
  User,
  UserSettingsStatus,
  UserSettingsUpdate,
} from "../types/user-settings.types";

export const userSettingsSlice = createApiSliceNonJsonApi({
  reducerPath: "userSettingsApi",
}).injectEndpoints({
  endpoints: (builder) => ({
    getUserSettingsStatus: builder.query<UserSettingsStatus, void>({
      query: () => ({
        url: API_ENDPOINTS.USER_SETTINGS.STATUS,
        method: "GET",
      }),
    }),
    updateUserSettings: builder.mutation<User, UserSettingsUpdate>({
      query: (settings) => ({
        url: API_ENDPOINTS.USER_SETTINGS.UPDATE,
        method: "PUT",
        data: settings,
      }),
    }),
    getCurrencies: builder.query<CurrencyInfo[], void>({
      query: () => ({
        url: API_ENDPOINTS.CURRENCIES.LIST,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetUserSettingsStatusQuery,
  useUpdateUserSettingsMutation,
  useGetCurrenciesQuery,
} = userSettingsSlice;
