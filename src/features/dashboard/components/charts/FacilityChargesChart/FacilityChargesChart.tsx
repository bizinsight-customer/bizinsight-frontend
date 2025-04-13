import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { DATE_FORMAT } from "@/types/date.types";
import { Box, Grid, Paper, Typography } from "@mui/material";
import { differenceInDays, format } from "date-fns";
import React from "react";
import metricApi from "../../../api-slices";
import { NoDataMessage } from "../NoDataMessage";
import { ComparisonChartProps } from "../types/chart-props.types";
import { ChargeChart } from "./components/ChargeChart";
import { processChartData } from "./utils/chart-data-processor";

export const FacilityChargesChart: React.FC<ComparisonChartProps> = ({
  mode,
  startDate,
  endDate,
  prevStartDate,
  prevEndDate,
  periodDays,
}) => {
  const { data, isLoading, error } = metricApi.facility.useGetDataQuery(
    {
      start_date: startDate ? format(startDate, DATE_FORMAT) : "",
      end_date: endDate ? format(endDate, DATE_FORMAT) : "",
      ...(mode === "manual" && prevStartDate && prevEndDate
        ? {
            previous_start_date: format(prevStartDate, DATE_FORMAT),
            previous_end_date: format(prevEndDate, DATE_FORMAT),
          }
        : {}),
    },
    {
      skip:
        !startDate ||
        !endDate ||
        (mode === "manual" && (!prevStartDate || !prevEndDate)),
    }
  );

  const hasAnyCharges = React.useMemo(() => {
    if (!data?.metric_data?.current_period) return false;
    const { total_water, total_electricity, total_rent, total_other } =
      data.metric_data.current_period;
    return (
      total_water > 0 ||
      total_electricity > 0 ||
      total_rent > 0 ||
      total_other > 0
    );
  }, [data]);

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <ErrorMessage message="Error loading facility charges data" />;
  if (!data?.metric_data || !startDate || !endDate) return <NoDataMessage />;
  if (!hasAnyCharges)
    return (
      <Box sx={{ display: "flex", flexDirection: "column", height: "450px" }}>
        <Typography variant="h6" sx={{ mb: 3 }}>
          Facility Charges
        </Typography>
        <NoDataMessage />
      </Box>
    );

  const periodDuration = differenceInDays(endDate, startDate);

  const waterData = processChartData(
    data.metric_data.current_period.water,
    data.metric_data.previous_period?.water,
    periodDuration,
    mode,
    startDate,
    prevStartDate
  );
  const electricityData = processChartData(
    data.metric_data.current_period.electricity,
    data.metric_data.previous_period?.electricity,
    periodDuration,
    mode,
    startDate,
    prevStartDate
  );
  const rentData = processChartData(
    data.metric_data.current_period.rent,
    data.metric_data.previous_period?.rent,
    periodDuration,
    mode,
    startDate,
    prevStartDate
  );
  const otherData = processChartData(
    data.metric_data.current_period.other,
    data.metric_data.previous_period?.other,
    periodDuration,
    mode,
    startDate,
    prevStartDate
  );

  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Facility Charges
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2, height: "100%" }}>
            <ChargeChart
              data={waterData}
              title="Water Charges"
              total={data.metric_data.current_period.total_water}
              mode={mode}
              startDate={startDate}
              endDate={endDate}
              prevStartDate={prevStartDate}
              prevEndDate={prevEndDate}
              periodDays={periodDays}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2, height: "100%" }}>
            <ChargeChart
              data={electricityData}
              title="Electricity Charges"
              total={data.metric_data.current_period.total_electricity}
              mode={mode}
              startDate={startDate}
              endDate={endDate}
              prevStartDate={prevStartDate}
              prevEndDate={prevEndDate}
              periodDays={periodDays}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2, height: "100%" }}>
            <ChargeChart
              data={rentData}
              title="Rent Charges"
              total={data.metric_data.current_period.total_rent}
              mode={mode}
              startDate={startDate}
              endDate={endDate}
              prevStartDate={prevStartDate}
              prevEndDate={prevEndDate}
              periodDays={periodDays}
            />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper elevation={1} sx={{ p: 2, height: "100%" }}>
            <ChargeChart
              data={otherData}
              title="Other Charges"
              total={data.metric_data.current_period.total_other}
              mode={mode}
              startDate={startDate}
              endDate={endDate}
              prevStartDate={prevStartDate}
              prevEndDate={prevEndDate}
              periodDays={periodDays}
            />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
