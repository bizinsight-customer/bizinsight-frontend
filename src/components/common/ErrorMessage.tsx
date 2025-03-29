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
      justifyContent="center"
      minHeight="100%"
      width="100%"
      gap={1}
      sx={{
        p: 2,
        color: "error.main",
        bgcolor: "rgba(211, 47, 47, 0.08)",
        borderRadius: 1,
        border: 1,
        borderColor: "error.main",
        boxShadow: "0 2px 8px rgba(211, 47, 47, 0.15)",
        transition: "all 0.2s ease-in-out",
        "&:hover": {
          boxShadow: "0 4px 12px rgba(211, 47, 47, 0.25)",
          transform: "translateY(-1px)",
        },
        ...sx,
      }}
    >
      {showIcon && <ErrorIcon color="error" fontSize="small" />}
      <Typography
        color="error"
        sx={{
          fontWeight: 500,
          textAlign: "center",
          margin: "0 !important",
          ...sx,
        }}
        {...typographyProps}
      >
        {message}
      </Typography>
    </Box>
  );
};
