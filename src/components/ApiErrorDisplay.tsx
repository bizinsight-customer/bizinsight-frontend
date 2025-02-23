import { ErrorOutline as ErrorIcon } from "@mui/icons-material";
import { Alert, Box, Paper, Typography } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

interface ApiErrorDisplayProps {
  error: FetchBaseQueryError | SerializedError | undefined;
  title?: string;
}

export const ApiErrorDisplay = ({
  error,
  title = "An error occurred",
}: ApiErrorDisplayProps) => {
  if (!error) return null;

  let errorMessage = "Unknown error occurred";
  let statusCode: number | string | undefined;

  if ("status" in error) {
    // This is a FetchBaseQueryError
    statusCode = error.status;
    if (
      typeof error.data === "object" &&
      error.data &&
      "message" in error.data
    ) {
      errorMessage = String(error.data.message);
    } else if (typeof error.data === "string") {
      errorMessage = error.data;
    }
  } else if ("message" in error) {
    // This is a SerializedError
    errorMessage = error.message || errorMessage;
  }

  return (
    <Paper
      elevation={0}
      sx={{
        p: 3,
        bgcolor: "error.light",
        color: "error.contrastText",
        borderRadius: 1,
      }}
    >
      <Box display="flex" alignItems="center" gap={2} mb={2}>
        <ErrorIcon color="error" />
        <Typography variant="h6" component="h2">
          {title}
        </Typography>
      </Box>
      <Alert severity="error" sx={{ bgcolor: "transparent" }}>
        {statusCode && (
          <Typography variant="subtitle2" gutterBottom>
            Status Code: {statusCode}
          </Typography>
        )}
        <Typography>{errorMessage}</Typography>
      </Alert>
    </Paper>
  );
};
