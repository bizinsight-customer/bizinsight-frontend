import { ErrorMessage } from "@/components/common/ErrorMessage";
import { ENV } from "@/config/env";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { UserCompanyDataDialogContainer } from "@/features/profile/components/user-company-data-dialog-container";
import { Box, Button, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface UserMetadata {
  creationTime?: string;
  lastSignInTime?: string;
}

interface SerializableUser {
  uid: string;
  email: string | null;
  emailVerified: boolean;
  displayName: string | null;
  photoURL: string | null;
  phoneNumber: string | null;
  metadata: UserMetadata;
}

export const UserProfile = () => {
  const { user, firebaseUser } = useAuth();
  const [token, setToken] = useState<string | null>(null);
  const [tokenError, setTokenError] = useState<string | null>(null);
  const [showDialog, setShowDialog] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      if (ENV.ENV !== "development") return;

      try {
        if (firebaseUser) {
          const idToken = await firebaseUser.getIdToken(true);
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

    fetchToken();
  }, [firebaseUser]);

  const formatUserData = (data: SerializableUser) => {
    return Object.entries(data).map(([key, value]) => (
      <Box key={key} sx={{ mb: 1 }}>
        <Typography
          component="span"
          sx={{ fontWeight: "bold", color: "primary.main" }}
        >
          {key}:
        </Typography>{" "}
        <Typography component="span" sx={{ wordBreak: "break-all" }}>
          {typeof value === "object"
            ? JSON.stringify(value, null, 2)
            : String(value)}
        </Typography>
      </Box>
    ));
  };

  return (
    <Box sx={{ textAlign: "left", p: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 3,
        }}
      >
        <Typography variant="h4">User Profile</Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setShowDialog(true)}
        >
          Company Data
        </Button>
      </Box>

      <Box sx={{ mb: 3 }}>
        <Typography variant="subtitle1" color="text.secondary">
          Email: {user?.email || "No email available"}
        </Typography>
      </Box>

      {ENV.ENV === "development" && (
        <Paper elevation={2} sx={{ p: 2, mb: 3, bgcolor: "background.paper" }}>
          <Typography variant="h6" gutterBottom color="primary">
            Development Information
          </Typography>
          {token && (
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="subtitle2"
                color="text.secondary"
                gutterBottom
              >
                Firebase ID Token:
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  wordBreak: "break-all",
                  bgcolor: "grey.100",
                  p: 1,
                  borderRadius: 1,
                  fontFamily: "monospace",
                }}
              >
                {token}
              </Typography>
            </Box>
          )}
          {tokenError && <ErrorMessage message={tokenError} />}
          {user && (
            <Box sx={{ mb: 2 }}>
              <Typography variant="h6" gutterBottom color="primary">
                User Data
              </Typography>
              <Box
                sx={{
                  fontFamily: "monospace",
                  fontSize: "0.875rem",
                }}
              >
                {formatUserData(user as SerializableUser)}
              </Box>
            </Box>
          )}
        </Paper>
      )}

      {showDialog && (
        <UserCompanyDataDialogContainer
          skipIfHasRequiredData={false}
          onSuccess={() => setShowDialog(false)}
        />
      )}
    </Box>
  );
};
