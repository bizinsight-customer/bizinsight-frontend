import { useGetROMIQuery } from "@/features/dashboard/api-slices/romi.api-slice";
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

export const ROMIChart = ({ startDate, endDate }: SimpleChartProps) => {
  const { format: formatCurrency } = useFormatCurrency();
  const { data: romiData, isLoading } = useGetROMIQuery({
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

  if (!romiData) {
    return <NoDataMessage />;
  }

  const chartData = [
    {
      name: "Revenue",
      value: romiData.data.revenue,
    },
    {
      name: "Marketing Budget",
      value: romiData.data.marketing_budget,
    },
  ];

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h6">
          ROMI: {romiData.data.romi_percentage.toFixed(2)}%
        </Typography>
        <Typography variant="h6">
          ROMI Ratio: {romiData.data.romi_ratio.toFixed(2)}
        </Typography>
      </Box>
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
