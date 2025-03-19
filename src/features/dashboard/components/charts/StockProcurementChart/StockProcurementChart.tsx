import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import useFormatCurrency from "@/hooks/useFormatCurrency";
import { Box, Grid, Typography } from "@mui/material";
import { format } from "date-fns";
import React from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { useGetStockProcurementQuery } from "../../../api-slices/stock-procurement.api-slice";
import { NoDataMessage } from "../NoDataMessage";

// Predefined colors for categories
const CATEGORY_COLORS = [
  "#684AFF", // Primary purple
  "#FF915F", // Orange
  "#4CAF50", // Green
  "#2196F3", // Blue
];

interface StockProcurementChartProps {
  startDate: Date | null;
  endDate: Date | null;
}

interface ChartDataEntry {
  name: string;
  value: number;
  amount: number;
  color: string;
}

export const StockProcurementChart: React.FC<StockProcurementChartProps> = ({
  startDate,
  endDate,
}) => {
  const { format: formatCurrency, isLoading: isCurrencyLoading } =
    useFormatCurrency();

  const {
    data,
    isLoading: isDataLoading,
    error,
  } = useGetStockProcurementQuery(
    {
      start_date: startDate ? format(startDate, "dd.MM.yyyy") : "",
      end_date: endDate ? format(endDate, "dd.MM.yyyy") : "",
    },
    {
      skip: !startDate || !endDate,
    }
  );

  // Calculate total amount
  const totalAmount = React.useMemo(() => {
    if (!data) return 0;
    return (
      data.stock_procurement +
      data.customs +
      data.logistics +
      data.stock_procurement_other
    );
  }, [data]);

  // Transform data for the chart
  const chartData = React.useMemo<ChartDataEntry[]>(() => {
    if (!data) return [];

    const total =
      data.stock_procurement +
      data.customs +
      data.logistics +
      data.stock_procurement_other;

    return [
      {
        name: "Stock Procurement",
        value: total > 0 ? (data.stock_procurement / total) * 100 : 0,
        amount: data.stock_procurement,
        color: CATEGORY_COLORS[0],
      },
      {
        name: "Customs",
        value: total > 0 ? (data.customs / total) * 100 : 0,
        amount: data.customs,
        color: CATEGORY_COLORS[1],
      },
      {
        name: "Logistics",
        value: total > 0 ? (data.logistics / total) * 100 : 0,
        amount: data.logistics,
        color: CATEGORY_COLORS[2],
      },
      {
        name: "Other",
        value: total > 0 ? (data.stock_procurement_other / total) * 100 : 0,
        amount: data.stock_procurement_other,
        color: CATEGORY_COLORS[3],
      },
    ];
  }, [data]);

  return (
    <Box sx={{ height: "450px", display: "flex", flexDirection: "column" }}>
      <Box sx={{ mb: 3 }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6">Stock Procurement Expenses</Typography>
        </Box>
      </Box>

      {(isDataLoading || isCurrencyLoading) && <LoadingSpinner />}
      {error && <ErrorMessage message="Error loading stock procurement data" />}

      {!isDataLoading &&
        !isCurrencyLoading &&
        !error &&
        (!data || totalAmount === 0) && <NoDataMessage />}

      {data && totalAmount > 0 && chartData && chartData.length > 0 && (
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
      )}
    </Box>
  );
};
