import { Box } from "@mui/material";
import React from "react";
import { useCompanyDataCheck } from "../hooks/use-company-data-check";
import { CompanyDataDialog } from "./company-data-dialog";

interface CompanyDataProviderProps {
  children: React.ReactNode;
}

export const CompanyDataProvider: React.FC<CompanyDataProviderProps> = ({
  children,
}) => {
  const { showDialog, closeDialog, companyData, isRequired, hasRequiredData } =
    useCompanyDataCheck();

  if (hasRequiredData === false) {
    return (
      <Box
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          bgcolor: "background.default",
          zIndex: (theme) => theme.zIndex.drawer + 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CompanyDataDialog
          open={showDialog}
          onClose={closeDialog}
          initialData={companyData}
          isRequired={isRequired}
        />
      </Box>
    );
  }

  return (
    <>
      {children}
      <CompanyDataDialog
        open={showDialog}
        onClose={closeDialog}
        initialData={companyData}
        isRequired={isRequired}
      />
    </>
  );
};
