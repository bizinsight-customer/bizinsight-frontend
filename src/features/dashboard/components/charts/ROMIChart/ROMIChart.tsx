import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import metricApi from "../../../api-slices";
import { NoDataMessage } from "../NoDataMessage";
import { SimpleChartProps } from "../types/chart-props.types";

export const ROMIChart: React.FC<SimpleChartProps> = ({
  startDate,
  endDate,
}) => {
  const { format: formatCurrency } = useFormatCurrency();

  const { data, isLoading, error } = metricApi.romi.useGetDataQuery({
    start_date: startDate ? format(startDate, "dd.MM.yyyy") : "",
    end_date: endDate ? format(endDate, "dd.MM.yyyy") : "",
  });

  const chartData = React.useMemo(() => {
    if (!data?.metric_data) return [];

    const percentage = data.metric_data.romi_percentage;
    // Cap the percentage at 100 for visualization purposes
    const normalizedPercentage = Math.min(percentage, 100);
    const remaining = 100 - normalizedPercentage;

    return [
      { value: normalizedPercentage, color: "#36B37E" }, // Green for ROMI
      { value: remaining, color: "#E9EDF2" }, // Light gray for remaining
    ];
  }, [data]);

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Return on Marketing Investment</Typography>
        </Box>
      </Box>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message="Error loading ROMI data" />}

      {!isLoading && !error && !data?.metric_data && <NoDataMessage />}

      {data?.metric_data && (
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
                  <Cell key={`cell-${index}`} fill={entry.color} />
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
              {data.metric_data.romi_percentage.toFixed(1)}%
            </Typography>
            <Typography
              variant="caption"
              sx={{
                mb: 1,
                color: "text.primary",
                fontWeight: 500,
                display: "block",
              }}
            >
              ROMI Ratio: {data.metric_data.romi_ratio.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Revenue: {formatCurrency(data.metric_data.revenue)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Marketing Budget:{" "}
              {formatCurrency(data.metric_data.marketing_budget)}
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
