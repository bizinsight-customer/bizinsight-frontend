import { COLORS } from "@/constants/colors";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router";

interface SignUpFormProps {
  isLoading: boolean;
}

interface PasswordRequirement {
  label: string;
  met: boolean;
}

export const SignUpForm = ({ isLoading }: SignUpFormProps) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [requirements, setRequirements] = useState<PasswordRequirement[]>([
    { label: "At least 8 characters", met: false },
    { label: "Contains a number or symbol", met: false },
    { label: "Cannot contain your name or email address", met: false },
  ]);

  const { signUp } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    // Update password requirements
    const newRequirements = [...requirements];
    newRequirements[0].met = formData.password.length >= 8;
    newRequirements[1].met = /[0-9!@#$%^&*(),.?":{}|<>]/.test(
      formData.password
    );
    newRequirements[2].met = !formData.password
      .toLowerCase()
      .includes(formData.email.toLowerCase());

    setRequirements(newRequirements);

    // Calculate password strength (0-100)
    let strength = 0;
    if (formData.password.length >= 8) strength += 33;
    if (/[0-9!@#$%^&*(),.?":{}|<>]/.test(formData.password)) strength += 33;
    if (!/(.)\1{2,}/.test(formData.password)) strength += 34; // No repeating characters
    setPasswordStrength(strength);
  }, [formData.password, formData.email]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      return;
    }
    if (!requirements.every((req) => req.met)) {
      return;
    }
    const success = await signUp(formData.email, formData.password);
    if (success) {
      navigate("/auth/success");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleClickShowPassword = (field: "password" | "confirmPassword") => {
    if (field === "password") {
      setShowPassword(!showPassword);
    } else {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  const getStrengthColor = (strength: number) => {
    if (strength < 33) return COLORS.STATUS.ERROR;
    if (strength < 66) return COLORS.STATUS.WARNING;
    return COLORS.STATUS.SUCCESS;
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: "100%" }}>
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            bgcolor: "white",
          },
        }}
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
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            bgcolor: "white",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => handleClickShowPassword("password")}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {/* Password Strength Indicator */}
      {formData.password && (
        <Box sx={{ mt: 1 }}>
          <Typography variant="caption" color="text.secondary" gutterBottom>
            Password Strength:{" "}
            {passwordStrength < 33
              ? "Weak"
              : passwordStrength < 66
              ? "Medium"
              : "Strong"}
          </Typography>
          <LinearProgress
            variant="determinate"
            value={passwordStrength}
            sx={{
              height: 8,
              borderRadius: 4,
              bgcolor: COLORS.COMMON.GREY[200],
              "& .MuiLinearProgress-bar": {
                bgcolor: getStrengthColor(passwordStrength),
              },
            }}
          />
        </Box>
      )}

      {/* Password Requirements */}
      <Stack spacing={1} sx={{ mt: 2 }}>
        {requirements.map((requirement, index) => (
          <Box
            key={index}
            sx={{ display: "flex", alignItems: "center", gap: 1 }}
          >
            {requirement.met ? (
              <CheckCircleOutlineIcon
                sx={{ color: COLORS.STATUS.SUCCESS, fontSize: 20 }}
              />
            ) : (
              <RadioButtonUncheckedIcon
                sx={{ color: COLORS.COMMON.GREY[400], fontSize: 20 }}
              />
            )}
            <Typography
              variant="body2"
              color={requirement.met ? "text.primary" : "text.secondary"}
            >
              {requirement.label}
            </Typography>
          </Box>
        ))}
      </Stack>

      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type={showConfirmPassword ? "text" : "password"}
        id="confirmPassword"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={
          formData.confirmPassword !== "" &&
          formData.password !== formData.confirmPassword
        }
        helperText={
          formData.confirmPassword !== "" &&
          formData.password !== formData.confirmPassword
            ? "Passwords do not match"
            : ""
        }
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 2,
            bgcolor: "white",
          },
        }}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle confirm password visibility"
                onClick={() => handleClickShowPassword("confirmPassword")}
                edge="end"
              >
                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{
          mt: 3,
          mb: 2,
          py: 1.5,
          borderRadius: 2,
          bgcolor: COLORS.PRIMARY.MAIN,
          "&:hover": {
            bgcolor: COLORS.PRIMARY.DARK,
          },
        }}
        disabled={
          isLoading ||
          !requirements.every((req) => req.met) ||
          formData.password !== formData.confirmPassword
        }
      >
        Create Account
      </Button>
    </Box>
  );
};
