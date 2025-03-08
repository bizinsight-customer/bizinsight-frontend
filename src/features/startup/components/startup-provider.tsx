import { UserCompanyDataDialogContainer } from "@/features/profile/components/user-company-data-dialog-container";
import { UserSettingsDialogContainer } from "@/features/profile/components/user-settings-dialog-container";
import { Box } from "@mui/material";
import React, { useState } from "react";
import { StartupProviderProps } from "../types";

type StartupStep = "settings" | "company" | "complete";

export const StartupProvider: React.FC<StartupProviderProps> = ({
  children,
}) => {
  const [currentStep, setCurrentStep] = useState<StartupStep>("settings");

  // If we're complete, render children
  if (currentStep === "complete") {
    return <>{children}</>;
  }

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
      {currentStep === "settings" && (
        <UserSettingsDialogContainer
          onSuccess={() => setCurrentStep("company")}
        />
      )}
      {currentStep === "company" && (
        <UserCompanyDataDialogContainer
          onSuccess={() => setCurrentStep("complete")}
        />
      )}
    </Box>
  );
};
