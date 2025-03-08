import { API_ENDPOINTS } from "@/config/api";
import { createApiSliceNonJsonApi } from "@/store/create-api-slice";

export type Currency = string;

export interface UserSettings {
  system_currency: Currency | null;
}

export const globalUserSettingsApiSlice = createApiSliceNonJsonApi({
  reducerPath: "globalUserSettingsApi",
  tagTypes: ["GlobalUserSettings"],
}).injectEndpoints({
  endpoints: (builder) => ({
    getGlobalUserSettings: builder.query<UserSettings, void>({
      query: () => ({
        url: API_ENDPOINTS.USER_SETTINGS.GET,
        method: "GET",
      }),
      providesTags: ["GlobalUserSettings"],
    }),
  }),
});

export const { useGetGlobalUserSettingsQuery } = globalUserSettingsApiSlice;
