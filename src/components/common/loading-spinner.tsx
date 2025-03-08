import { Box, CircularProgress, Typography } from "@mui/material";

interface LoadingSpinnerProps {
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => {
  return (
    <Box sx={{ textAlign: "center" }}>
      <CircularProgress />
      {text && <Typography sx={{ mt: 2 }}>{text}</Typography>}
    </Box>
  );
};
