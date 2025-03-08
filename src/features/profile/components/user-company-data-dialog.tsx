import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useUpdateUserCompanyDataMutation } from "../store/user-company.api-slice";
import { UserCompanyData } from "../types/user-company.types";

interface UserCompanyDataDialogProps {
  open: boolean;
  onClose?: () => void;
  initialData?: UserCompanyData | null;
  isRequired?: boolean;
  onSuccess?: () => void;
}

export const UserCompanyDataDialog: React.FC<UserCompanyDataDialogProps> = ({
  open,
  onClose,
  initialData,
  isRequired = false,
  onSuccess,
}) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<UserCompanyData>({
    defaultValues: initialData || {
      name: "",
      tax_number: "",
      registration_number: "",
      legal_address: "",
      postal_address: "",
      phone: "",
      bank_name: "",
      bank_account: "",
      bank_swift: "",
    },
  });

  const [updateCompanyData, { isLoading, error }] =
    useUpdateUserCompanyDataMutation();

  const onSubmit = async (data: UserCompanyData) => {
    console.log("onSubmit", data);
    try {
      await updateCompanyData(data).unwrap();
      onSuccess?.();
      if (!isRequired) {
        onClose?.();
      }
    } catch {
      // Error is handled by the mutation
    }
  };

  return (
    <Dialog
      open={open}
      onClose={!isRequired ? onClose : undefined}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle sx={{ paddingTop: 5, px: 8 }} fontSize={27}>
        {isRequired
          ? "Complete Company Information"
          : "Update Company Information"}
      </DialogTitle>
      <form onSubmit={handleSubmit(onSubmit)}>
        <DialogContent sx={{ px: 8 }}>
          <Stack spacing={2}>
            {isRequired && (
              <Alert severity="info" sx={{ mb: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Before you can start using the application, please provide
                  your company information.
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  This information is required for proper functioning of the
                  application and will be used for document processing.
                </Typography>
              </Alert>
            )}
            {error && (
              <Alert severity="error">
                Failed to update company data. Please try again.
              </Alert>
            )}
            <Controller
              name="name"
              control={control}
              rules={{ required: "Company name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Company Name"
                  fullWidth
                  error={!!errors.name}
                  helperText={errors.name?.message}
                  required
                />
              )}
            />
            <Controller
              name="tax_number"
              control={control}
              rules={{ required: "Tax number is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Tax Number"
                  fullWidth
                  error={!!errors.tax_number}
                  helperText={errors.tax_number?.message}
                  required
                />
              )}
            />
            <Controller
              name="registration_number"
              control={control}
              rules={{ required: "Registration number is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Registration Number"
                  fullWidth
                  error={!!errors.registration_number}
                  helperText={errors.registration_number?.message}
                  required
                />
              )}
            />
            <Controller
              name="legal_address"
              control={control}
              rules={{ required: "Legal address is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Legal Address"
                  fullWidth
                  error={!!errors.legal_address}
                  helperText={errors.legal_address?.message}
                  required
                />
              )}
            />
            <Controller
              name="postal_address"
              control={control}
              rules={{ required: "Postal address is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Postal Address"
                  fullWidth
                  error={!!errors.postal_address}
                  helperText={errors.postal_address?.message}
                  required
                />
              )}
            />
            <Controller
              name="phone"
              control={control}
              rules={{ required: "Phone number is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Phone"
                  fullWidth
                  error={!!errors.phone}
                  helperText={errors.phone?.message}
                  required
                />
              )}
            />
            <Controller
              name="bank_name"
              control={control}
              rules={{ required: "Bank name is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Bank Name"
                  fullWidth
                  error={!!errors.bank_name}
                  helperText={errors.bank_name?.message}
                  required
                />
              )}
            />
            <Controller
              name="bank_account"
              control={control}
              rules={{ required: "Bank account is required" }}
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Bank Account"
                  fullWidth
                  error={!!errors.bank_account}
                  helperText={errors.bank_account?.message}
                  required
                />
              )}
            />
            <Controller
              name="bank_swift"
              control={control}
              render={({ field }) => (
                <TextField {...field} label="Bank SWIFT" fullWidth />
              )}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          {!isRequired && <Button onClick={onClose}>Cancel</Button>}
          <Button type="submit" variant="contained" disabled={isLoading}>
            {isLoading ? "Updating..." : "Update Company Data"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
