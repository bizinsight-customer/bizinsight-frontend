import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { DATE_FORMAT } from "@/types/date.types";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import metricApi from "../../../api-slices";
import { NoDataMessage } from "../NoDataMessage";
import { SimpleChartProps } from "../types/chart-props.types";

const getColorForPercentage = (percentage: number): string => {
  if (percentage <= 2) return "#36B37E"; // Green for good return rate
  if (percentage <= 5) return "#FFAB00"; // Yellow for warning
  return "#FF5630"; // Red for concerning return rate
};

export const ReturnRateChart = ({ startDate, endDate }: SimpleChartProps) => {
  const { data, isLoading, error } = metricApi.returnRate.useGetDataQuery({
    start_date: startDate ? format(startDate, DATE_FORMAT) : "",
    end_date: endDate ? format(endDate, DATE_FORMAT) : "",
  });

  const chartData = React.useMemo(() => {
    if (!data) return [];

    const returnRate = data.metric_data.return_rate;
    const remaining = 100 - returnRate;

    return [
      { value: returnRate, color: getColorForPercentage(returnRate) },
      { value: remaining, color: "#E9EDF2" }, // Light gray for remaining
    ];
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Error loading return rate data" />;
  }

  if (!data?.metric_data) {
    return <NoDataMessage />;
  }

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Return Rate</Typography>
        </Box>
      </Box>

      <Box sx={{ flex: 1, minHeight: 0, position: "relative" }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="57%"
              startAngle={220}
              endAngle={-40}
              innerRadius="85%"
              outerRadius="95%"
              paddingAngle={0}
              dataKey="value"
              strokeLinecap="round"
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={entry.color}
                  strokeWidth={0}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -20%)",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              mb: 1,
              color: "text.primary",
              fontWeight: 500,
            }}
          >
            {data.metric_data.return_rate.toFixed(1)}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Return Rate
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
