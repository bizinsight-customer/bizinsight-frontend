import { useGetAverageTicketQuery } from "@/features/dashboard/api-slices/average-ticket.api-slice";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { DATE_FORMAT } from "@/types/date.types";
import { Box, CircularProgress } from "@mui/material";
import { format } from "date-fns";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { CustomTooltip } from "../CustomTooltip";
import { NoDataMessage } from "../NoDataMessage";
import { ComparisonChartProps } from "../types/chart-props.types";

export const AverageTicketChart = ({
  startDate,
  endDate,
}: ComparisonChartProps) => {
  const { format: formatCurrency } = useFormatCurrency();
  const { data: averageTicket, isLoading } = useGetAverageTicketQuery({
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

  if (!averageTicket?.data.periods.length) {
    return <NoDataMessage />;
  }

  const chartData = averageTicket.data.periods.map((period) => ({
    date: format(new Date(period.start_date), DATE_FORMAT),
    average: period.average_ticket,
  }));

  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={(value) => formatCurrency(value)} />
        <Tooltip content={<CustomTooltip />} />
        <Legend />
        <Line
          type="monotone"
          dataKey="average"
          name="Average Ticket"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};
