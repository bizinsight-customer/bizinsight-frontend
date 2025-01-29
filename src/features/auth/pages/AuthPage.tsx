import { useAuth } from "@/hooks/useAuth";
import {
  Alert,
  Box,
  Container,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { SignInForm } from "../components/SignInForm";
import { SignUpForm } from "../components/SignUpForm";

type AuthMode = "signin" | "signup";

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("signin");
  const { error } = useAuth();
  const theme = useTheme();

  const handleModeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: AuthMode | null
  ) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <ToggleButtonGroup
            color="primary"
            value={mode}
            exclusive
            onChange={handleModeChange}
            aria-label="authentication mode"
            sx={{ mb: 3 }}
          >
            <ToggleButton value="signin">Sign In</ToggleButton>
            <ToggleButton value="signup">Sign Up</ToggleButton>
          </ToggleButtonGroup>

          <Typography component="h1" variant="h5" sx={{ mb: 3 }}>
            {mode === "signin" ? "Sign In" : "Create Account"}
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
              {error.message}
            </Alert>
          )}

          {mode === "signin" ? <SignInForm /> : <SignUpForm />}
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage;
