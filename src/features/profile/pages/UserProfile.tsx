import { useUser } from "@/store";
import { Box, Button, Typography } from "@mui/material";
import { getAuth } from "firebase/auth";
import { useState } from "react";

export const UserProfile = () => {
  const userData = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);

  const handleGetToken = async () => {
    try {
      const auth = getAuth();
      if (auth.currentUser) {
        const idToken = await auth.currentUser.getIdToken(true);
        setToken(idToken);
        setTokenError(null);
      } else {
        setTokenError("No current user");
      }
    } catch (error) {
      console.error("Error getting token:", error);
      setTokenError(error instanceof Error ? error.message : "Unknown error");
      setToken(null);
    }
  };

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        User Profile
      </Typography>

      <Button
        variant="contained"
        color="primary"
        onClick={handleGetToken}
        sx={{ mb: 2 }}
      >
        Get Firebase ID Token
      </Button>

      {token && (
        <Typography variant="body1" sx={{ wordBreak: "break-all", mb: 2 }}>
          Firebase ID Token: {token}
        </Typography>
      )}

      {tokenError && (
        <Typography variant="body2" color="error" sx={{ mb: 2 }}>
          Error: {tokenError}
        </Typography>
      )}

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
