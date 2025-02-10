import { useTypedNavigate } from "@/hooks/useTypedNavigate";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
} from "@mui/material";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";

export const SignUpForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    passwordConfirmation: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const { signUp, signUpLoading, signUpError } = useAuth();
  const navigate = useTypedNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear password error when either password field changes
    if (name === "password" || name === "passwordConfirmation") {
      setPasswordError(false);
    }
  };

  const validatePasswords = () => {
    const isMatch = formData.password === formData.passwordConfirmation;
    setPasswordError(!isMatch);
    return isMatch;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validatePasswords()) {
      return;
    }

    try {
      await signUp(formData.email, formData.password);
      navigate.navigateTo("/auth/signup-success");
    } catch (error) {
      console.error("Sign up error", error);
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="name"
        label="Full Name"
        name="name"
        autoComplete="name"
        autoFocus
        value={formData.name}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        value={formData.email}
        onChange={handleChange}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        id="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
        error={passwordError}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="passwordConfirmation"
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        id="passwordConfirmation"
        autoComplete="new-password"
        value={formData.passwordConfirmation}
        onChange={handleChange}
        error={passwordError}
        helperText={passwordError ? "Passwords do not match" : ""}
      />
      {signUpError && (
        <Box sx={{ color: "error.main", mt: 2 }}>{signUpError.message}</Box>
      )}
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
        disabled={signUpLoading}
      >
        {signUpLoading ? "Creating Account..." : "Sign Up"}
      </Button>
    </Box>
  );
};
