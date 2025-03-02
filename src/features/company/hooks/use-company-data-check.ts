import { useEffect, useState } from "react";
import {
  useGetCompanyDataQuery,
  useHasRequiredCompanyDataQuery,
} from "../store/company.slice";

export const useCompanyDataCheck = () => {
  const [showDialog, setShowDialog] = useState(false);
  const { data: hasRequiredData, isLoading: isCheckingData } =
    useHasRequiredCompanyDataQuery();

  const { data: companyData } = useGetCompanyDataQuery();

  useEffect(() => {
    if (!isCheckingData && hasRequiredData === false) {
      setShowDialog(true);
    }
  }, [hasRequiredData, isCheckingData]);

  const openDialog = () => setShowDialog(true);
  const closeDialog = () => setShowDialog(false);

  return {
    showDialog,
    openDialog,
    closeDialog,
    companyData,
    isRequired: hasRequiredData === false,
    hasRequiredData: hasRequiredData === true, // hasRequiredData can be undefined
  };
};
