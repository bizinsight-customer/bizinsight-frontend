import { addDays, differenceInDays, subDays } from "date-fns";
import { useEffect, useState } from "react";
import { DateSelectionMode } from "../components/charts/RevenueChart/revenue-chart.types";

export interface DashboardDates {
  mode: DateSelectionMode;
  startDate: Date | null;
  endDate: Date | null;
  prevStartDate: Date | null;
  prevEndDate: Date | null;
  periodDays: number;
  setMode: (mode: DateSelectionMode) => void;
  setStartDate: (date: Date | null) => void;
  setEndDate: (date: Date | null) => void;
  setPrevStartDate: (date: Date | null) => void;
  setPeriodDays: (days: number) => void;
}

export const useDashboardDates = (): DashboardDates => {
  const [mode, setMode] = useState<DateSelectionMode>("auto");
  const [periodDays, setPeriodDays] = useState<number>(30);

  // Current period dates
  const [startDate, setStartDate] = useState<Date | null>(
    new Date(new Date().setMonth(new Date().getMonth() - 1))
  );
  const [endDate, setEndDate] = useState<Date | null>(new Date());

  // Previous period dates for manual mode
  const [prevStartDate, setPrevStartDate] = useState<Date | null>(null);
  const [prevEndDate, setPrevEndDate] = useState<Date | null>(null);

  // Reset or set previous dates when switching modes or when startDate changes
  useEffect(() => {
    if (mode === "auto" && startDate && endDate) {
      const diffInDays = differenceInDays(endDate, startDate);
      const prevEnd = subDays(startDate, 1);
      setPrevEndDate(prevEnd);
      setPrevStartDate(subDays(prevEnd, diffInDays));
    } else if (mode === "manual" && startDate) {
      setPrevStartDate(subDays(startDate, periodDays));
    }
  }, [mode, startDate, endDate, periodDays]);

  // Calculate end dates based on period days in manual mode
  useEffect(() => {
    if (mode === "manual" && startDate && periodDays > 0) {
      setEndDate(addDays(startDate, periodDays));
    }
    if (mode === "manual" && prevStartDate && periodDays > 0) {
      setPrevEndDate(addDays(prevStartDate, periodDays));
    }
  }, [mode, startDate, prevStartDate, periodDays]);

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
