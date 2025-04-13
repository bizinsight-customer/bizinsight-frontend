import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { DATE_FORMAT } from "@/types/date.types";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import GroupIcon from "@mui/icons-material/Group";
import { Box, Divider, Stack, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import metricApi from "../../../api-slices";

interface SalaryMetricsProps {
  startDate: Date | null;
  endDate: Date | null;
}

export const SalaryMetrics: React.FC<SalaryMetricsProps> = ({
  startDate,
  endDate,
}) => {
  const { format: formatCurrency } = useFormatCurrency();

  const {
    data: salaryData,
    isLoading,
    error,
  } = metricApi.salary.useGetDataQuery(
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
      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message="Error loading salary data" />}

      {salaryData && (
        <Stack
          spacing={3}
          sx={{ flex: 1 }}
          alignContent={"center"}
          paddingLeft={10}
          paddingRight={10}
          paddingTop={6}
          paddingBottom={6}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Total Salary
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <AccountBalanceWalletIcon
                sx={{ fontSize: 32, color: "primary.main" }}
              />
              <Typography variant="h4" component="div">
                {formatCurrency(salaryData.metric_data.total_amount)}
              </Typography>
            </Box>
          </Box>

          <Divider />

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography variant="subtitle1" color="text.secondary">
              Number of Workers
            </Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 2,
                justifyContent: "center",
              }}
            >
              <GroupIcon sx={{ fontSize: 32, color: "primary.main" }} />
              <Typography variant="h4" component="div">
                {salaryData.metric_data.number_of_workers}
              </Typography>
            </Box>
          </Box>
        </Stack>
      )}
    </Box>
  );
};
