import { formatCurrency } from "@/features/dashboard/utils/format-currency";
import useSystemCurrency from "./useSystemCurrency";

/**
 * Hook that provides a currency formatting function using the system currency
 * @returns {Object} Object containing the formatting function and loading state
 * @property {(value: number) => string} format - Function to format a number as currency
 * @property {boolean} isLoading - Whether the currency settings are being loaded
 * @property {boolean} isError - Whether there was an error loading the currency settings
 * @property {string | null} currency - The current system currency
 */
export const useFormatCurrency = () => {
  const { currency, isLoading, isError } = useSystemCurrency();

  const format = (value: number): string => {
    if (!currency) {
      // Fallback to USD if no system currency is set
      return formatCurrency(value, "USD");
    }
    return formatCurrency(value, currency);
  };

  return {
    format,
    isLoading,
    isError,
    currency,
  };
};

export default useFormatCurrency;
