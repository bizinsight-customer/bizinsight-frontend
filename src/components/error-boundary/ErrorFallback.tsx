import { isAuthError } from "@/constants/error-messages";
import { AUTH_ROUTES } from "@/features/auth/routes";
import { Button, Container, Paper, Typography } from "@mui/material";
import { useEffect } from "react";
import { FallbackProps } from "react-error-boundary";
import { useNavigate } from "react-router";

export const ErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthError(error.message)) {
      console.log("NAVIGATING TO SIGN IN");
      // Reset the error boundary before navigating
      resetErrorBoundary();
      // Navigate to sign in page
      navigate(AUTH_ROUTES.SIGN_IN, { replace: true });
    }
  }, [error, resetErrorBoundary, navigate]);

  return (
    <Container maxWidth="sm" sx={{ mt: 8 }}>
      <Paper sx={{ p: 4 }}>
        <Typography variant="h5" component="h1" gutterBottom color="error">
          Something went wrong
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          {error.message}
        </Typography>
        {process.env.NODE_ENV === "development" && (
          <Typography
            variant="body2"
            component="pre"
            sx={{
              whiteSpace: "pre-wrap",
              backgroundColor: (theme) => theme.palette.grey[100],
              p: 2,
              borderRadius: 1,
              mb: 2,
            }}
          >
            {error.stack}
          </Typography>
        )}
        <Button
          variant="contained"
          color="primary"
          onClick={resetErrorBoundary}
          fullWidth
        >
          Try Again
        </Button>
      </Paper>
    </Container>
  );
};
