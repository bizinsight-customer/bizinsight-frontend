import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useUpdateUserSettingsMutation } from "../store/user-settings.api-slice";
import { CurrencyInfo } from "../types/user-settings.types";

export interface UserSettingsDialogProps {
  open: boolean;
  onClose: () => void;
  currencies: CurrencyInfo[];
  isRequired?: boolean;
  onSuccess?: () => void;
}

export const UserSettingsDialog: React.FC<UserSettingsDialogProps> = ({
  open,
  onClose,
  currencies,
  isRequired = false,
  onSuccess,
}) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [updateSettings, { isLoading }] = useUpdateUserSettingsMutation();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await updateSettings({ system_currency: selectedCurrency }).unwrap();
      onSuccess?.();
      if (!isRequired) {
        onClose();
      }
    } catch (error) {
      console.error("Failed to update currency settings:", error);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={isRequired ? undefined : onClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        {isRequired ? "Required Settings" : "User Settings"}
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mt: 2 }}>
          <Typography variant="body1" color="text.secondary" paragraph>
            {isRequired
              ? "Please select your system currency to continue"
              : "Select your preferred system currency"}
          </Typography>
          <FormControl fullWidth>
            <InputLabel id="currency-select-label">Currency</InputLabel>
            <Select
              labelId="currency-select-label"
              id="currency-select"
              value={selectedCurrency}
              label="Currency"
              onChange={handleChange}
            >
              {currencies.map((currency) => (
                <MenuItem key={currency.code} value={currency.code}>
                  {currency.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleSubmit}
            disabled={!selectedCurrency || isLoading}
          >
            Save Currency
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};
