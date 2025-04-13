import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { DATE_FORMAT } from "@/types/date.types";
import { Box, Typography } from "@mui/material";
import { format } from "date-fns";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import metricApi from "../../../api-slices";
import { CustomTooltip } from "../CustomTooltip";
import { NoDataMessage } from "../NoDataMessage";
import { SimpleChartProps } from "../types/chart-props.types";

const COLORS = ["#0088FE", "#FF8042"];

export const RevenueExpenseRatioChart = ({
  startDate,
  endDate,
}: SimpleChartProps) => {
  const { format: formatCurrency } = useFormatCurrency();
  const { data, isLoading, error } =
    metricApi.revenueExpenseRatio.useGetDataQuery({
      start_date: startDate ? format(startDate, DATE_FORMAT) : "",
      end_date: endDate ? format(endDate, DATE_FORMAT) : "",
    });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Error loading revenue expense ratio data" />;
  }

  if (!data?.metric_data) {
    return <NoDataMessage />;
  }

  const chartData = [
    {
      name: "Revenue",
      value: data.metric_data.revenue_percent,
      amount: data.metric_data.revenue,
    },
    {
      name: "Expenses",
      value: data.metric_data.expenses_percent,
      amount: data.metric_data.expenses,
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">
          Revenue: {formatCurrency(data.metric_data.revenue)}
        </Typography>
        <Typography variant="h6">
          Expenses: {formatCurrency(data.metric_data.expenses)}
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
