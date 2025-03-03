import { format, isValid, parse } from "date-fns";
import { DATE_FORMAT } from "../RevenueChart/revenue-chart.types";

export const parseDateSafely = (dateStr: string): Date | null => {
  try {
    const parsed = parse(dateStr, DATE_FORMAT, new Date());
    return isValid(parsed) ? parsed : null;
  } catch {
    return null;
  }
};

export const formatChartDate = (date: Date): string => {
  return format(date, "MMM dd");
};
