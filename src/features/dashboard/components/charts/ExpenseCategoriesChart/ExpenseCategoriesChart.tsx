import { Box, Grid, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import React, { useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useGetExpenseCategoriesQuery } from "../../../services/expense-categories-api";
import { formatCurrency } from "../../../utils/format-currency";
import { DateRangePicker } from "../DateRangePicker";

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

export const ExpenseCategoriesChart: React.FC = () => {
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  const { data, isLoading, error } = useGetExpenseCategoriesQuery(
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
      value: entry.percent,
      color: CATEGORY_COLORS[index % CATEGORY_COLORS.length],
    }));
  }, [data]);

  return (
    <Paper
      sx={{ p: 3, height: "500px", display: "flex", flexDirection: "column" }}
    >
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Expense Categories</Typography>
        </Box>

        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onStartDateChange={setStartDate}
          onEndDateChange={setEndDate}
        />
      </Box>

      {isLoading && <Typography>Loading...</Typography>}
      {error && (
        <Typography color="error">
          Error loading expense categories data
        </Typography>
      )}

      {data && (
        <Grid container spacing={3} sx={{ flex: 1 }}>
          <Grid item xs={12} md={8}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
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
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
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
            </Box>
          </Grid>
          <Grid item xs={12} md={4}>
            <Box
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <Typography variant="h6" sx={{ mb: 2 }}>
                Total Expenses: {formatCurrency(data.total_amount)}
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                {data.categories.map((category, index) => (
                  <Box
                    key={index}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        borderRadius: "50%",
                        backgroundColor:
                          CATEGORY_COLORS[index % CATEGORY_COLORS.length],
                      }}
                    />
                    <Typography variant="body2">
                      {category.category} ({category.percent.toFixed(1)}%)
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </Paper>
  );
};
