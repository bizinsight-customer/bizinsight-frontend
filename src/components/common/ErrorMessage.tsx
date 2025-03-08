import { ErrorOutline as ErrorIcon } from "@mui/icons-material";
import { Box, Typography, TypographyProps } from "@mui/material";

interface ErrorMessageProps extends Omit<TypographyProps, "color"> {
  /**
   * The error message to display
   */
  message: string;
  /**
   * Whether to show the error icon
   * @default true
   */
  showIcon?: boolean;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  message,
  showIcon = true,
  sx,
  ...typographyProps
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      sx={{ p: 2, color: "error.main" }}
    >
      {showIcon && <ErrorIcon color="error" fontSize="small" />}
      <Typography color="error" sx={sx} {...typographyProps}>
        {message}
      </Typography>
    </Box>
  );
};
