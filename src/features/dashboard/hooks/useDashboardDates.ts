import { addDays, endOfDay, format, startOfDay, subDays } from "date-fns";
import { useCallback, useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import { DateSelectionMode } from "../components/charts/RevenueChart/revenue-chart.types";

interface UseDashboardDatesOptions {
  initialMode?: DateSelectionMode;
  initialStartDate?: Date | null;
  initialEndDate?: Date | null;
  initialPrevStartDate?: Date | null;
  initialPeriodDays?: number;
}

export const useDashboardDates = (options: UseDashboardDatesOptions = {}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const hasInitialDates = Boolean(
    options.initialStartDate && options.initialEndDate
  );
  const prevModeRef = useRef<DateSelectionMode | null>(null);

  const [mode, setMode] = useState<DateSelectionMode>(
    options.initialMode || "auto"
  );
  const [startDate, setStartDate] = useState<Date | null>(
    options.initialStartDate || startOfDay(new Date())
  );
  const [endDate, setEndDate] = useState<Date | null>(
    options.initialEndDate || endOfDay(new Date())
  );
  const [prevStartDate, setPrevStartDate] = useState<Date | null>(
    options.initialPrevStartDate || null
  );
  const [periodDays, setPeriodDays] = useState(options.initialPeriodDays || 7);

  const updatePrevEndDate = useCallback(() => {
    if (prevStartDate) {
      return addDays(prevStartDate, periodDays - 1);
    }
    return null;
  }, [prevStartDate, periodDays]);

  const [prevEndDate, setPrevEndDate] = useState<Date | null>(
    updatePrevEndDate()
  );

  // Update URL parameters when dates change
  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    // Update mode
    params.set("mode", mode);

    // Update dates
    if (startDate) {
      params.set("startDate", format(startDate, "dd-MM-yyyy"));
    } else {
      params.delete("startDate");
    }

    if (endDate) {
      params.set("endDate", format(endDate, "dd-MM-yyyy"));
    } else {
      params.delete("endDate");
    }

    if (prevStartDate) {
      params.set("prevStartDate", format(prevStartDate, "dd-MM-yyyy"));
    } else {
      params.delete("prevStartDate");
    }

    // Update period days
    params.set("periodDays", periodDays.toString());

    setSearchParams(params, { replace: true });
  }, [
    mode,
    startDate,
    endDate,
    prevStartDate,
    periodDays,
    setSearchParams,
    searchParams,
  ]);

  useEffect(() => {
    const shouldUpdateDates =
      mode === "auto" &&
      // Update if switching from manual to auto
      (prevModeRef.current === "manual" ||
        // Or if in auto mode and period changes (but not on initial render with dates)
        (prevModeRef.current === "auto" && !hasInitialDates));

    if (shouldUpdateDates) {
      setStartDate(startOfDay(subDays(new Date(), periodDays - 1)));
      setEndDate(endOfDay(new Date()));
    }

    prevModeRef.current = mode;
  }, [mode, periodDays, hasInitialDates]);

  useEffect(() => {
    setPrevEndDate(updatePrevEndDate());
  }, [prevStartDate, periodDays, updatePrevEndDate]);

  return {
    mode,
    startDate,
    endDate,
    prevStartDate,
    prevEndDate,
    periodDays,
    setMode,
    setStartDate,
    setEndDate,
    setPrevStartDate,
    setPeriodDays,
  };
};
