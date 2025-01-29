import { CheckCircle } from "@mui/icons-material";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router";

export const SignUpSuccessPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/dashboard");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        gap: 2,
      }}
    >
      <CheckCircle
        sx={{
          fontSize: 64,
          color: "success.main",
          mb: 2,
        }}
      />
      <Typography variant="h4" component="h1" gutterBottom>
        Account Created Successfully!
      </Typography>
      <Typography variant="body1" color="text.secondary">
        Redirecting to dashboard...
      </Typography>
      <CircularProgress size={24} sx={{ mt: 2 }} />
    </Box>
  );
};
