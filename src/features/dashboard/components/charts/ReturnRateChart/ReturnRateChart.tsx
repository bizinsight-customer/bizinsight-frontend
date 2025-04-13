import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { DATE_FORMAT } from "@/types/date.types";
import { Box, Typography } from "@mui/material";
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
import metricApi from "../../../api-slices";
import { CustomTooltip } from "../CustomTooltip";
import { NoDataMessage } from "../NoDataMessage";
import { SimpleChartProps } from "../types/chart-props.types";

export const ReturnRateChart = ({ startDate, endDate }: SimpleChartProps) => {
  const { data, isLoading, error } = metricApi.returnRate.useGetDataQuery({
    start_date: startDate ? format(startDate, DATE_FORMAT) : "",
    end_date: endDate ? format(endDate, DATE_FORMAT) : "",
  });

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Error loading return rate data" />;
  }

  if (!data?.metric_data) {
    return <NoDataMessage />;
  }

  const chartData = [
    {
      name: "Returns",
      value: data.metric_data.total_returns,
    },
    {
      name: "Sales",
      value: data.metric_data.total_sales,
    },
  ];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Return Rate: {data.metric_data.return_rate.toFixed(2)}%
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
