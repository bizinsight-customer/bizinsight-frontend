import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { People as PeopleIcon } from "@mui/icons-material";
import { Box, Paper, Typography } from "@mui/material";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { format } from "date-fns";
import React from "react";
import { useGetClientsMetricsQuery } from "../../../store/clients-metrics.api-slice";
import { SimpleChartProps } from "../types/chart-props.types";

const getErrorMessage = (
  error: FetchBaseQueryError | SerializedError
): string => {
  if ("status" in error) {
    return "error" in error
      ? String(error.error)
      : "An error occurred while fetching data";
  }
  return error.message ?? "Failed to load clients data";
};

const formatDateForApi = (date: Date | null): string | null => {
  return date ? format(date, "dd.MM.yyyy") : null;
};

export const ClientsMetrics: React.FC<SimpleChartProps> = ({
  startDate,
  endDate,
}) => {
  const { data, isLoading, error } = useGetClientsMetricsQuery({
    startDate: formatDateForApi(startDate),
    endDate: formatDateForApi(endDate),
  });

  if (isLoading) {
    return (
      <Paper
        sx={{ p: 3, height: "450px", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Total Unique Clients</Typography>
          </Box>
        </Box>
        <LoadingSpinner />
      </Paper>
    );
  }

  if (error) {
    return (
      <Paper
        sx={{ p: 3, height: "450px", display: "flex", flexDirection: "column" }}
      >
        <Box sx={{ mb: 3 }}>
          <Box sx={{ mb: 2 }}>
            <Typography variant="h6">Total Unique Clients</Typography>
          </Box>
        </Box>
        <ErrorMessage message={getErrorMessage(error)} />
      </Paper>
    );
  }

  return (
    <Paper
      sx={{ p: 3, height: "450px", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Total Unique Clients</Typography>
        </Box>
      </Box>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
          <PeopleIcon sx={{ fontSize: 48, color: "primary.main" }} />
          <Box
            sx={{
              width: 200,
              height: 200,
              borderRadius: "50%",
              border: "4px solid",
              borderColor: "primary.main",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              bgcolor: "background.paper",
            }}
          >
            <Typography
              variant="h1"
              component="div"
              color="primary"
              sx={{
                fontSize: "4.5rem",
                fontWeight: "bold",
              }}
            >
              {data?.total_clients || 0}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};
