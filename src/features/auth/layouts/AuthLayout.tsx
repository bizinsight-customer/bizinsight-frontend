import { Box } from "@mui/material";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: (theme) => theme.palette.grey[100],
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Outlet />
    </Box>
  );
};

export default AuthLayout;
