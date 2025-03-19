import { TextField, TextFieldProps } from "@mui/material";

interface ReadOnlyTextFieldProps
  extends Omit<TextFieldProps, "InputProps" | "variant" | "margin"> {
  label: string;
  value: string | number | null | undefined;
}

export const ReadOnlyTextField = ({
  label,
  value,
  fullWidth = true,
  multiline = false,
  ...props
}: ReadOnlyTextFieldProps) => (
  <TextField
    label={label}
    value={value || "N/A"}
    fullWidth={fullWidth}
    multiline={multiline}
    InputProps={{
      readOnly: true,
    }}
    variant="outlined"
    margin="normal"
    {...props}
  />
);
