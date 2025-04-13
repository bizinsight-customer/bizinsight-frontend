import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { DATE_FORMAT } from "@/types/date.types";
import { People as PeopleIcon } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import metricApi from "../../../api-slices";
import { NoDataMessage } from "../NoDataMessage";
import { SimpleChartProps } from "../types/chart-props.types";

export const ClientsMetrics: React.FC<SimpleChartProps> = ({
  startDate,
  endDate,
}) => {
  const { data, isLoading, error } = metricApi.clientsMetrics.useGetDataQuery(
    {
      start_date: startDate ? format(startDate, DATE_FORMAT) : "",
      end_date: endDate ? format(endDate, DATE_FORMAT) : "",
    },
    {
      skip: !startDate || !endDate,
    }
  );

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Total Unique Clients</Typography>
        </Box>
      </Box>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message="Error loading clients data" />}

      {!isLoading &&
        !error &&
        (!data?.metric_data || data.metric_data.total_clients === 0) && (
          <NoDataMessage />
        )}

      {data?.metric_data && data.metric_data.total_clients > 0 && (
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
                {data.metric_data.total_clients}
              </Typography>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};
