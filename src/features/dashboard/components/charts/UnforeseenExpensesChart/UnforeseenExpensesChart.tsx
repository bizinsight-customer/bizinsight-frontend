import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import { useGetUnforeseenExpensesQuery } from "../../../api-slices/unforeseen-expenses.api-slice";
import { NoDataMessage } from "../NoDataMessage";

interface UnforeseenExpensesChartProps {
  startDate: Date;
  endDate: Date;
}

export const UnforeseenExpensesChart: React.FC<
  UnforeseenExpensesChartProps
> = ({ startDate, endDate }) => {
  const { format: formatCurrency } = useFormatCurrency();

  const { data, isLoading, error } = useGetUnforeseenExpensesQuery({
    start_date: format(startDate, "dd.MM.yyyy"),
    end_date: format(endDate, "dd.MM.yyyy"),
  });

  const chartData = React.useMemo(() => {
    if (!data) return [];

    const percentage = (data.unforeseen_expenses / data.total_expenses) * 100;
    const remaining = 100 - percentage;

    return [
      { value: percentage, color: "#FF4842" }, // Red for unforeseen expenses
      { value: remaining, color: "#E9EDF2" }, // Light gray for remaining
    ];
  }, [data]);

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Unforeseen Expenses</Typography>
        </Box>
      </Box>

      {isLoading && <LoadingSpinner />}
      {error && (
        <ErrorMessage message="Error loading unforeseen expenses data" />
      )}

      {!isLoading && !error && (!data || data.unforeseen_expenses === 0) && (
        <NoDataMessage />
      )}

      {data && data.unforeseen_expenses > 0 && (
        <Box sx={{ flex: 1, minHeight: 0, position: "relative" }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="70%"
                startAngle={170}
                endAngle={10}
                innerRadius="70%"
                outerRadius="100%"
                paddingAngle={0}
                dataKey="value"
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
            <Typography variant="h4" color="primary" sx={{ mb: 1 }}>
              {formatCurrency(data.unforeseen_expenses)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              of {formatCurrency(data.total_expenses)} total
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};
