import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { DATE_FORMAT } from "@/types/date.types";
import { Box, Paper, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import metricApi from "../../../api-slices";
import { NoDataMessage } from "../NoDataMessage";
import { SimpleChartProps } from "../types/chart-props.types";
import { formatChartDate, parseDateSafely } from "../utils/date-utils";

interface ChartEntry {
  displayDate: string;
  periodStart: string;
  periodEnd: string;
  average: number;
}

export const AverageTicketChart = ({
  startDate,
  endDate,
}: SimpleChartProps) => {
  const { format: formatCurrency } = useFormatCurrency();
  const { data, isLoading, error } = metricApi.averageTicket.useGetDataQuery(
    {
      start_date: startDate ? format(startDate, DATE_FORMAT) : "",
      end_date: endDate ? format(endDate, DATE_FORMAT) : "",
    },
    {
      skip: !startDate || !endDate,
    }
  );

  const chartData = React.useMemo(() => {
    if (!data?.metric_data?.periods) return [];

    const chartDataLocal = data.metric_data.periods
      .map((period) => {
        const startDate = parseDateSafely(period.start_date);
        const endDate = parseDateSafely(period.end_date);

        if (!startDate || !endDate) return null;

        return {
          displayDate: `${formatChartDate(startDate)} - ${formatChartDate(
            endDate
          )}`,
          periodStart: period.start_date,
          periodEnd: period.end_date,
          average: period.average_ticket,
        };
      })
      .filter((entry): entry is ChartEntry => entry !== null);

    return chartDataLocal;
  }, [data]);

  const hasData = React.useMemo(() => {
    return chartData.some((entry) => entry.average > 0);
  }, [chartData]);

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Average Ticket Over Time</Typography>
        </Box>
      </Box>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message="Error loading average ticket data" />}

      {!isLoading &&
        !error &&
        (!chartData || chartData.length === 0 || !hasData) && <NoDataMessage />}

      {chartData && chartData.length > 0 && hasData && (
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="displayDate"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip content={<CustomAverageTicketTooltip />} />
              <Bar
                dataKey="average"
                fill="#684AFF"
                name="Average Ticket"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

interface CustomAverageTicketTooltipProps {
  active?: boolean;
  payload?: {
    payload: ChartEntry;
    value: number;
    dataKey: string;
  }[];
  label?: string;
}

const CustomAverageTicketTooltip: React.FC<CustomAverageTicketTooltipProps> = ({
  active,
  payload,
  label,
}) => {
  const { format: formatCurrency } = useFormatCurrency();

  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload as ChartEntry;

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="body2">
        <Box>Period: {label}</Box>
        <Box>Average Ticket: {formatCurrency(data.average)}</Box>
      </Typography>
    </Paper>
  );
};
