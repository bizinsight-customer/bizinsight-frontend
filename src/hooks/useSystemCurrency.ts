import { useGetGlobalUserSettingsQuery } from "@/store/global-api-slices/global-user-settings.api-slice";

/**
 * Hook to access the system currency setting
 * @returns {Object} Object containing the system currency and loading state
 * @property {string | null} currency - The system currency or null if not set
 * @property {boolean} isLoading - Whether the currency is being loaded
 * @property {boolean} isError - Whether there was an error loading the currency
 * @property {() => void} refetch - Function to refetch the currency
 */
export const useSystemCurrency = () => {
  const {
    data: settings,
    isLoading,
    isError,
    refetch,
  } = useGetGlobalUserSettingsQuery();

  return {
    currency: settings?.system_currency ?? null,
    isLoading,
    isError,
    refetch,
  };
};

export default useSystemCurrency;
