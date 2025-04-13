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
  if (percentage <= 30) return "#36B37E"; // Green for good
  if (percentage <= 50) return "#FFAB00"; // Yellow for warning
  return "#FF5630"; // Red for danger
};

export const CogsChart = ({ startDate, endDate }: SimpleChartProps) => {
  const { data, isLoading, error } = metricApi.cogs.useGetDataQuery({
    start_date: startDate ? format(startDate, DATE_FORMAT) : "",
    end_date: endDate ? format(endDate, DATE_FORMAT) : "",
  });

  const chartData = React.useMemo(() => {
    if (!data) return [];

    const cogsPercentage = data.metric_data.cogs_percentage;
    const remaining = 100 - cogsPercentage;

    return [
      { value: cogsPercentage, color: getColorForPercentage(cogsPercentage) },
      { value: remaining, color: "#E9EDF2" }, // Light gray for remaining
    ];
  }, [data]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Error loading COGS data" />;
  }

  if (!data?.metric_data) {
    return <NoDataMessage />;
  }

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">COGS Percentage</Typography>
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
            {data.metric_data.cogs_percentage.toFixed(0)}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Cost of Goods Sold
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
