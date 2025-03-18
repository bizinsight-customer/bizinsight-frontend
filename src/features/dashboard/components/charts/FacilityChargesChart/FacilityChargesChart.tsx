import { ErrorMessage } from "@/components/common/ErrorMessage";
import { LoadingSpinner } from "@/components/common/loading-spinner";
import { Grid, Paper, Typography } from "@mui/material";
import { differenceInDays, format } from "date-fns";
import React from "react";
import { useGetFacilityChargesQuery } from "../../../api-slices/facility.api-slice";
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
  const {
    data: facilityData,
    isLoading,
    error,
  } = useGetFacilityChargesQuery(
    {
      start_date: startDate ? format(startDate, "dd.MM.yyyy") : "",
      end_date: endDate ? format(endDate, "dd.MM.yyyy") : "",
      ...(mode === "manual" && prevStartDate && prevEndDate
        ? {
            previous_start_date: format(prevStartDate, "dd.MM.yyyy"),
            previous_end_date: format(prevEndDate, "dd.MM.yyyy"),
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

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return <ErrorMessage message="Error loading facility charges data" />;
  if (!facilityData || !startDate || !endDate) return null;

  const periodDuration = differenceInDays(endDate, startDate);

  const waterData = processChartData(
    facilityData.current_period.water,
    facilityData.previous_period?.water,
    periodDuration,
    mode,
    startDate,
    prevStartDate
  );
  const electricityData = processChartData(
    facilityData.current_period.electricity,
    facilityData.previous_period?.electricity,
    periodDuration,
    mode,
    startDate,
    prevStartDate
  );
  const rentData = processChartData(
    facilityData.current_period.rent,
    facilityData.previous_period?.rent,
    periodDuration,
    mode,
    startDate,
    prevStartDate
  );
  const otherData = processChartData(
    facilityData.current_period.other,
    facilityData.previous_period?.other,
    periodDuration,
    mode,
    startDate,
    prevStartDate
  );

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 3 }}>
        Facility Charges
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <ChargeChart
            data={waterData}
            title="Water Charges"
            total={facilityData.current_period.total_water}
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            prevStartDate={prevStartDate}
            prevEndDate={prevEndDate}
            periodDays={periodDays}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChargeChart
            data={electricityData}
            title="Electricity Charges"
            total={facilityData.current_period.total_electricity}
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            prevStartDate={prevStartDate}
            prevEndDate={prevEndDate}
            periodDays={periodDays}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChargeChart
            data={rentData}
            title="Rent Charges"
            total={facilityData.current_period.total_rent}
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            prevStartDate={prevStartDate}
            prevEndDate={prevEndDate}
            periodDays={periodDays}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <ChargeChart
            data={otherData}
            title="Other Charges"
            total={facilityData.current_period.total_other}
            mode={mode}
            startDate={startDate}
            endDate={endDate}
            prevStartDate={prevStartDate}
            prevEndDate={prevEndDate}
            periodDays={periodDays}
          />
        </Grid>
      </Grid>
    </Paper>
  );
};
