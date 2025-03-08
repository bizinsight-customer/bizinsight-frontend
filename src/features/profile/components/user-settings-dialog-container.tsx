import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { useEffect } from "react";
import {
  useGetCurrenciesQuery,
  useGetUserSettingsStatusQuery,
} from "../store/user-settings.api-slice";
import { UserSettingsDialog } from "./user-settings-dialog";

interface UserSettingsDialogContainerProps {
  onSuccess: () => void;
}

export const UserSettingsDialogContainer: React.FC<
  UserSettingsDialogContainerProps
> = ({ onSuccess }) => {
  const {
    data: settingsStatus,
    isLoading: isCheckingSettings,
    error: settingsError,
  } = useGetUserSettingsStatusQuery();
  const {
    data: currencies,
    isLoading: isLoadingCurrencies,
    error: currenciesError,
  } = useGetCurrenciesQuery();

  const isLoading = isCheckingSettings || isLoadingCurrencies;
  const error = settingsError || currenciesError;

  // If user already has required settings, call success immediately
  useEffect(() => {
    if (!isLoading && settingsStatus?.has_system_currency === true) {
      onSuccess();
    }
  }, [settingsStatus, isLoading, onSuccess]);

  if (isLoading) {
    return <LoadingSpinner text="Loading currencies..." />;
  }

  if (error) {
    return (
      <ErrorMessage message="Error loading settings. Please try again later." />
    );
  }

  return (
    <UserSettingsDialog
      open={true}
      onClose={() => {}}
      currencies={currencies || []}
      isRequired={settingsStatus?.has_system_currency === false}
      onSuccess={onSuccess}
    />
  );
};
