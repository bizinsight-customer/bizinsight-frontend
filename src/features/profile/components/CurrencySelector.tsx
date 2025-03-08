import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useUpdateUserSettingsMutation } from "../store/user-settings.api-slice";

interface CurrencySelectorProps {
  currencies: string[];
  onSuccess?: () => void;
}

export const CurrencySelector = ({
  currencies,
  onSuccess,
}: CurrencySelectorProps) => {
  const [selectedCurrency, setSelectedCurrency] = useState<string>("");
  const [updateSettings] = useUpdateUserSettingsMutation();

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedCurrency(event.target.value);
  };

  const handleSubmit = async () => {
    try {
      await updateSettings({ system_currency: selectedCurrency }).unwrap();
      onSuccess?.();
    } catch (error) {
      console.error("Failed to update currency settings:", error);
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 400, mx: "auto", mt: 4 }}>
      <Typography variant="h6" gutterBottom>
        Select System Currency
      </Typography>
      <Box sx={{ mt: 2 }}>
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
              <MenuItem key={currency} value={currency}>
                {currency}
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
          disabled={!selectedCurrency}
        >
          Save Currency
        </Button>
      </Box>
    </Paper>
  );
};
