import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Typography } from "@mui/material";
import { useEffect } from "react";
import {
  useGetUserCompanyDataQuery,
  useHasRequiredUserCompanyDataQuery,
} from "../store/user-company.api-slice";
import { UserCompanyDataDialog } from "./user-company-data-dialog";

interface UserCompanyDataDialogContainerProps {
  onSuccess: () => void;
  skipIfHasRequiredData?: boolean;
}

export const UserCompanyDataDialogContainer: React.FC<
  UserCompanyDataDialogContainerProps
> = ({ onSuccess, skipIfHasRequiredData = true }) => {
  const {
    data: hasRequiredData,
    isLoading: isCheckingRequired,
    error: requiredError,
  } = useHasRequiredUserCompanyDataQuery();
  const {
    data: userCompanyData,
    isLoading: isLoadingData,
    error: dataError,
  } = useGetUserCompanyDataQuery();

  const isLoading = isCheckingRequired || isLoadingData;
  const error = requiredError || dataError;

  // If user already has required data, call success immediately
  useEffect(() => {
    if (!isLoading && hasRequiredData === true) {
      if (skipIfHasRequiredData) {
        onSuccess();
      }
    }
  }, [hasRequiredData, isLoading, onSuccess, skipIfHasRequiredData]);

  if (isLoading) {
    return <LoadingSpinner text="Loading company data..." />;
  }

  if (error) {
    return (
      <Typography color="error" sx={{ p: 3 }}>
        Error loading company data. Please try again later.
      </Typography>
    );
  }

  return (
    <UserCompanyDataDialog
      open={true}
      onClose={() => {}}
      initialData={userCompanyData}
      isRequired={hasRequiredData === false}
      onSuccess={onSuccess}
    />
  );
};
