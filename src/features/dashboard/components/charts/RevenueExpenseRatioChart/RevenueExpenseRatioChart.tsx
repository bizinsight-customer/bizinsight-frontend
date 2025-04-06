import { useGetRevenueExpenseRatioQuery } from "@/features/dashboard/api-slices/revenue-expense-ratio.api-slice";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { DATE_FORMAT } from "@/types/date.types";
import { Box, CircularProgress, Typography } from "@mui/material";
import { format } from "date-fns";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { CustomTooltip } from "../CustomTooltip";
import { NoDataMessage } from "../NoDataMessage";
import { SimpleChartProps } from "../types/chart-props.types";

const COLORS = ["#0088FE", "#FF8042"];

export const RevenueExpenseRatioChart = ({
  startDate,
  endDate,
}: SimpleChartProps) => {
  const { format: formatCurrency } = useFormatCurrency();
  const { data: ratioData, isLoading } = useGetRevenueExpenseRatioQuery({
    start_date: startDate ? format(startDate, DATE_FORMAT) : "",
    end_date: endDate ? format(endDate, DATE_FORMAT) : "",
  });

  if (isLoading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height={400}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (!ratioData) {
    return <NoDataMessage />;
  }

  const chartData = [
    {
      name: "Revenue",
      value: ratioData.data.revenue_percent,
      amount: ratioData.data.revenue,
    },
    {
      name: "Expenses",
      value: ratioData.data.expenses_percent,
      amount: ratioData.data.expenses,
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">
          Revenue: {formatCurrency(ratioData.data.revenue)}
        </Typography>
        <Typography variant="h6">
          Expenses: {formatCurrency(ratioData.data.expenses)}
        </Typography>
      </Box>
      <ResponsiveContainer width="100%" height={400}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            label={({ name, value }) => `${name}: ${value.toFixed(1)}%`}
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};
