import { useGetReturnRateQuery } from "@/features/dashboard/api-slices/return-rate.api-slice";
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

export const ReturnRateChart = ({ startDate, endDate }: SimpleChartProps) => {
  const { data: returnRateData, isLoading } = useGetReturnRateQuery({
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

  if (!returnRateData) {
    return <NoDataMessage />;
  }

  const chartData = [
    {
      name: "Returns",
      value: returnRateData.data.total_returns,
    },
    {
      name: "Sales",
      value: returnRateData.data.total_sales,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Return Rate: {returnRateData.data.return_rate.toFixed(2)}%
      </Typography>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};
