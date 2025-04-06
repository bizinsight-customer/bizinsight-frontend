import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
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
import { useGetSalesQuery } from "../../../api-slices/sales.api-slice";
import { NoDataMessage } from "../NoDataMessage";
import { formatChartDate, parseDateSafely } from "../utils/date-utils";

interface SalesChartProps {
  startDate: Date | null;
  endDate: Date | null;
}

interface ChartEntry {
  displayDate: string;
  periodStart: string;
  periodEnd: string;
  sales: number;
}

export const SalesChart: React.FC<SalesChartProps> = ({
  startDate,
  endDate,
}) => {
  const {
    data: salesData,
    isLoading,
    error,
  } = useGetSalesQuery(
    {
      start_date: startDate ? format(startDate, DATE_FORMAT) : "",
      end_date: endDate ? format(endDate, DATE_FORMAT) : "",
    },
    {
      skip: !startDate || !endDate,
    }
  );

  const chartData = React.useMemo(() => {
    if (!salesData) return [];

    const chartDataLocal = salesData.periods
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
          sales: period.count,
        };
      })
      .filter((entry): entry is ChartEntry => entry !== null);

    return chartDataLocal;
  }, [salesData]);

  const hasSales = React.useMemo(() => {
    return chartData.some((entry) => entry.sales > 0);
  }, [chartData]);

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Sales Over Time</Typography>
        </Box>
      </Box>

      {isLoading && <LoadingSpinner />}
      {error && <ErrorMessage message="Error loading sales data" />}

      {!isLoading &&
        !error &&
        (!chartData || chartData.length === 0 || !hasSales) && (
          <NoDataMessage />
        )}

      {chartData && chartData.length > 0 && hasSales && (
        <Box sx={{ flex: 1, minHeight: 0 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="displayDate"
                angle={-45}
                textAnchor="end"
                height={100}
              />
              <YAxis
                label={{
                  value: "Number of Sales",
                  angle: -90,
                  position: "insideLeft",
                  style: {
                    textAnchor: "middle",
                  },
                }}
              />
              <Tooltip content={<CustomSalesToolTip />} />
              <Bar
                dataKey="sales"
                fill="#684AFF"
                name="Number of Sales"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </Box>
      )}
    </Box>
  );
};

interface CustomSalesToolTipProps {
  active?: boolean;
  payload?: {
    payload: ChartEntry;
    value: number;
    dataKey: string;
  }[];
  label?: string;
}

const CustomSalesToolTip: React.FC<CustomSalesToolTipProps> = ({
  active,
  payload,
  label,
}) => {
  if (!active || !payload || !payload.length) return null;

  const data = payload[0].payload as ChartEntry;

  return (
    <Paper sx={{ p: 1 }}>
      <Typography variant="body2">
        <Box>Period: {label}</Box>
        <Box>Sales: {data.sales}</Box>
      </Typography>
    </Paper>
  );
};
