import { QueryStats } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import React from "react";

export const NoDataMessage: React.FC = () => {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 2,
        }}
      >
        <QueryStats
          sx={{
            fontSize: 48,
            color: "text.secondary",
            opacity: 0.8,
          }}
        />
        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ textAlign: "center" }}
        >
          No data available for the selected period
        </Typography>
      </Box>
    </Box>
  );
};
