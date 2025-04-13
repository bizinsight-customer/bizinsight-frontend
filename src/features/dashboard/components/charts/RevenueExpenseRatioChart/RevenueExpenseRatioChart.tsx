import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { DATE_FORMAT } from "@/types/date.types";
import { Box, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import metricApi from "../../../api-slices";
import { NoDataMessage } from "../NoDataMessage";
import { SimpleChartProps } from "../types/chart-props.types";

const COLORS = ["#684AFF", "#FF915F"]; // Using the same color scheme as StockProcurementChart

export const RevenueExpenseRatioChart = ({
  startDate,
  endDate,
}: SimpleChartProps) => {
  const { format: formatCurrency, isLoading: isCurrencyLoading } =
    useFormatCurrency();
  const { data, isLoading, error } =
    metricApi.revenueExpenseRatio.useGetDataQuery({
      start_date: startDate ? format(startDate, DATE_FORMAT) : "",
      end_date: endDate ? format(endDate, DATE_FORMAT) : "",
    });

  if (isLoading || isCurrencyLoading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <ErrorMessage message="Error loading revenue expense ratio data" />;
  }

  if (!data?.metric_data) {
    return <NoDataMessage />;
  }

  const totalAmount = data.metric_data.revenue + data.metric_data.expenses;

  const chartData = [
    {
      name: "Revenue",
      value: data.metric_data.revenue_percent,
      amount: data.metric_data.revenue,
      color: COLORS[0],
    },
    {
      name: "Expenses",
      value: data.metric_data.expenses_percent,
      amount: data.metric_data.expenses,
      color: COLORS[1],
    },
  ];

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Revenue & Expenses Ratio</Typography>
        </Box>
      </Box>

      <Grid container sx={{ flex: 1 }}>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={100}
                  outerRadius={160}
                  paddingAngle={1}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number) => `${value.toFixed(1)}%`}
                  contentStyle={{
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    border: "1px solid #ccc",
                    borderRadius: "4px",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <Box
              sx={{
                position: "absolute",
                top: "52%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                textAlign: "center",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  fontWeight: "bold",
                  color: "text.primary",
                  lineHeight: 1.2,
                }}
              >
                {formatCurrency(totalAmount)}
              </Typography>
              <Typography
                variant="subtitle1"
                sx={{
                  color: "text.secondary",
                  mt: 0.5,
                }}
              >
                Total
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              gap: 1,
              overflowY: "auto",
              pl: { xs: 0, md: 2 },
            }}
          >
            {chartData.map((entry) => (
              <Box
                key={entry.name}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Box
                  sx={{
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    bgcolor: entry.color,
                  }}
                />
                <Typography>
                  {entry.name}: {entry.value.toFixed(1)}% (
                  {formatCurrency(entry.amount)})
                </Typography>
              </Box>
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
