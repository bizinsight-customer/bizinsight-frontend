import { COLORS } from "@/constants/colors";
import { useAuth } from "@/features/auth/hooks/useAuth";
import AppleIcon from "@mui/icons-material/Apple";
import GoogleIcon from "@mui/icons-material/Google";
import WindowIcon from "@mui/icons-material/Window";
import {
  Alert,
  Box,
  Container,
  Divider,
  IconButton,
  Paper,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { SignInForm } from "../components/SignInForm";
import { SignUpForm } from "../components/SignUpForm";

type AuthMode = "signin" | "signup";

const AuthPage = () => {
  const [mode, setMode] = useState<AuthMode>("signup");
  const { error, isLoading } = useAuth();
  const currentError = mode === "signin" ? error?.signIn : error?.signUp;
  const isCurrentLoading =
    mode === "signin" ? isLoading.signIn : isLoading.signUp;

  const handleModeChange = (
    _: React.MouseEvent<HTMLElement>,
    newMode: AuthMode | null
  ) => {
    if (newMode !== null) {
      setMode(newMode);
    }
  };

  const handleSocialLogin = (provider: string) => {
    // TODO: Implement social login
    console.log(`Login with ${provider}`);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 4,
          marginBottom: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Box sx={{ mb: 4, display: "flex", alignItems: "center" }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{
              fontWeight: "bold",
              "& span": { color: COLORS.PRIMARY.MAIN },
            }}
          >
            <span>AI</span> THING
          </Typography>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            borderRadius: 3,
            bgcolor: "background.paper",
          }}
        >
          {/* Auth Mode Toggle */}
          <ToggleButtonGroup
            color="primary"
            value={mode}
            exclusive
            onChange={handleModeChange}
            aria-label="authentication mode"
            sx={{
              mb: 4,
              "& .MuiToggleButton-root": {
                border: "none",
                borderRadius: 2,
                px: 4,
                py: 1,
                "&.Mui-selected": {
                  bgcolor: COLORS.PRIMARY.MAIN,
                  color: "white",
                  "&:hover": {
                    bgcolor: COLORS.PRIMARY.DARK,
                  },
                },
              },
            }}
          >
            <ToggleButton value="signup">Sign Up</ToggleButton>
            <ToggleButton value="signin">Sign In</ToggleButton>
          </ToggleButtonGroup>

          {currentError && (
            <Alert severity="error" sx={{ mb: 2, width: "100%" }}>
              {currentError.message}
            </Alert>
          )}

          {mode === "signin" ? (
            <SignInForm isLoading={isCurrentLoading} />
          ) : (
            <SignUpForm isLoading={isCurrentLoading} />
          )}

          {/* Social Login Options */}
          <Box sx={{ width: "100%", mt: 3 }}>
            <Divider sx={{ my: 2 }}>
              <Typography color="text.secondary" variant="body2">
                OR
              </Typography>
            </Divider>
            <Stack
              direction="row"
              spacing={2}
              justifyContent="center"
              sx={{ mt: 2 }}
            >
              <IconButton
                onClick={() => handleSocialLogin("google")}
                sx={{
                  border: `1px solid ${COLORS.COMMON.GREY[300]}`,
                  borderRadius: 2,
                  p: 2.5,
                  color: COLORS.COMMON.GREY[700],
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: COLORS.COMMON.GREY[50],
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                  },
                }}
              >
                <GoogleIcon />
              </IconButton>
              <IconButton
                onClick={() => handleSocialLogin("apple")}
                sx={{
                  border: `1px solid ${COLORS.COMMON.GREY[300]}`,
                  borderRadius: 2,
                  p: 2.5,
                  color: COLORS.COMMON.GREY[700],
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: COLORS.COMMON.GREY[50],
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                  },
                }}
              >
                <AppleIcon />
              </IconButton>
              <IconButton
                onClick={() => handleSocialLogin("microsoft")}
                sx={{
                  border: `1px solid ${COLORS.COMMON.GREY[300]}`,
                  borderRadius: 2,
                  p: 2.5,
                  color: COLORS.COMMON.GREY[700],
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: COLORS.COMMON.GREY[50],
                  },
                  "& .MuiSvgIcon-root": {
                    fontSize: 28,
                  },
                }}
              >
                <WindowIcon />
              </IconButton>
            </Stack>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage;
