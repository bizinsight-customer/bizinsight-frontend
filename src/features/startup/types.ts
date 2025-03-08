import { ReactNode } from "react";

export interface StartupDialogProps {
  open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export interface StartupProviderProps {
  children: ReactNode;
}
