import { DATE_FORMAT } from "@/types/date.types";
import { format, isValid, parse } from "date-fns";

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
