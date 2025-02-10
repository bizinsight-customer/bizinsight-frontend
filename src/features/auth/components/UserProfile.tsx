import { Box, Typography } from "@mui/material";
import { useAuthStore } from "../store/authSlice";

export const UserProfile = () => {
  const token = useAuthStore((state) => state.token);
  const userData = useAuthStore((state) => state.userData);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>
      <Typography variant="body1">Firebase ID Token: {token}</Typography>
      {userData && (
        <Box>
          <Typography variant="h5" gutterBottom>
            User Data
          </Typography>
          <pre>{JSON.stringify(userData, null, 2)}</pre>
        </Box>
      )}
    </Box>
  );
};
