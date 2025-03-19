import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { Box, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useGetExpenseCategoriesQuery } from "../../../api-slices/expense-categories.api-slice";
import { NoDataMessage } from "../NoDataMessage";
import { SimpleChartProps } from "../types/chart-props.types";

// Predefined colors for categories
const CATEGORY_COLORS = [
  "#684AFF", // Primary purple
  "#FF915F", // Orange
  "#4CAF50", // Green
  "#2196F3", // Blue
  "#F44336", // Red
  "#9C27B0", // Purple
  "#FFC107", // Amber
  "#00BCD4", // Cyan
  "#795548", // Brown
  "#607D8B", // Blue Grey
];

export const ExpenseCategoriesChart: React.FC<SimpleChartProps> = ({
  startDate,
  endDate,
}) => {
  const { format: formatCurrency, isLoading: isCurrencyLoading } =
    useFormatCurrency();

  const {
    data,
    isLoading: isDataLoading,
    error,
  } = useGetExpenseCategoriesQuery(
    {
      start_date: startDate ? format(startDate, "dd.MM.yyyy") : "",
      end_date: endDate ? format(endDate, "dd.MM.yyyy") : "",
    },
    {
      skip: !startDate || !endDate,
    }
  );

  // Transform data for the chart
  const chartData = React.useMemo(() => {
    if (!data) return [];
    return data.categories.map((entry, index) => ({
      name: entry.category,
      value: (entry.amount / data.total_amount) * 100,
      amount: entry.amount,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }));
  }, [data]);

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Expense Categories</Typography>
        </Box>
      </Box>

      {(isDataLoading || isCurrencyLoading) && <LoadingSpinner />}
      {error && (
        <ErrorMessage message="Error loading expense categories data" />
      )}

      {!isDataLoading &&
        !isCurrencyLoading &&
        !error &&
        (!chartData || chartData.length === 0) && <NoDataMessage />}

      {data && chartData && chartData.length > 0 && (
        <Grid container sx={{ flex: 1 }}>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    innerRadius={100}
                    outerRadius={160}
                    paddingAngle={1}
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                    contentStyle={{
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      border: "1px solid #ccc",
                      borderRadius: "4px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <Box
                sx={{
                  position: "absolute",
                  top: "52%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{
                    fontWeight: "bold",
                    color: "text.primary",
                    lineHeight: 1.2,
                  }}
                >
                  {formatCurrency(data.total_amount)}
                </Typography>
                <Typography
                  variant="subtitle1"
                  sx={{
                    color: "text.secondary",
                    mt: 0.5,
                  }}
                >
                  Total
                </Typography>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                gap: 1,
                overflowY: "auto",
                pl: { xs: 0, md: 2 },
              }}
            >
              {chartData.map((entry) => (
                <Box
                  key={entry.name}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 16,
                      height: 16,
                      borderRadius: "50%",
                      bgcolor: entry.color,
                    }}
                  />
                  <Typography>
                    {entry.name}: {entry.value.toFixed(1)}% (
                    {formatCurrency(entry.amount)})
                  </Typography>
                </Box>
              ))}
            </Box>
          </Grid>
        </Grid>
      )}
    </Box>
  );
};
