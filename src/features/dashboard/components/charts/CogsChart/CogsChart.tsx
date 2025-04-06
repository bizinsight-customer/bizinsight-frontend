import { useGetCogsQuery } from "@/features/dashboard/api-slices/cogs.api-slice";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { DATE_FORMAT } from "@/types/date.types";
import { Box, CircularProgress, Typography } from "@mui/material";
import { format } from "date-fns";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "../CustomTooltip";
import { NoDataMessage } from "../NoDataMessage";
import { SimpleChartProps } from "../types/chart-props.types";

export const CogsChart = ({ startDate, endDate }: SimpleChartProps) => {
  const { format: formatCurrency } = useFormatCurrency();
  const { data: cogsData, isLoading } = useGetCogsQuery({
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

  if (!cogsData) {
    return <NoDataMessage />;
  }

  const chartData = [
    {
      name: "Stock Procurement",
      value: cogsData.data.stock_procurement,
    },
    {
      name: "Revenue",
      value: cogsData.data.revenue,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        COGS Percentage: {cogsData.data.cogs_percentage.toFixed(2)}%
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis tickFormatter={(value) => formatCurrency(value)} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
