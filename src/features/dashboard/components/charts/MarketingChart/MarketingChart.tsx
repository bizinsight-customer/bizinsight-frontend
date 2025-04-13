import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import metricApi from "../../../api-slices";
import { NoDataMessage } from "../NoDataMessage";
import { BaseDateProps } from "../types/chart-props.types";

type MarketingChartProps = Required<BaseDateProps>;

export const MarketingChart: React.FC<MarketingChartProps> = ({
  startDate,
  endDate,
}) => {
  const { format: formatCurrency } = useFormatCurrency();

  const { data, isLoading, error } = metricApi.marketing.useGetDataQuery({
    start_date: format(startDate, "dd.MM.yyyy"),
    end_date: format(endDate, "dd.MM.yyyy"),
  });

  const chartData = React.useMemo(() => {
    if (!data) return [];

    const marketingAmount = data.metric_data.marketing_expenses;
    const percentage = (marketingAmount / data.metric_data.total_income) * 100;
    const remaining = 100 - percentage;

    return [
      { value: percentage, color: "#36B37E" }, // Green for marketing expenses
      { value: remaining, color: "#E9EDF2" }, // Light gray for remaining
    ];
  }, [data]);

  const roas = React.useMemo(() => {
    if (!data || data.metric_data.marketing_expenses === 0) return 0;
    return data.metric_data.total_income / data.metric_data.marketing_expenses;
  }, [data]);

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Marketing Expenses</Typography>
        </Box>
      </Box>

      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorMessage message="Error loading marketing expenses data" />
      )}

      {!isLoading &&
        !error &&
        (!data || data.metric_data.marketing_expenses === 0) && (
          <NoDataMessage />
        )}

      {data && data.metric_data.marketing_expenses > 0 && (
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
              {formatCurrency(data.metric_data.marketing_expenses)}
            </Typography>
            <Typography
              variant="caption"
              sx={{
                mb: 1,
                color: "text.primary",
                fontWeight: 500,
              }}
            >
              ROAS - {roas.toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              of {formatCurrency(data.metric_data.total_income)} total income
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
