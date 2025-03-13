import { addDays, differenceInDays } from "date-fns";
import { DateSelectionMode } from "../../RevenueChart/revenue-chart.types";
import { formatChartDate, parseDateSafely } from "../../utils/date-utils";
import { ChartEntry } from "../facility-charges-chart.types";

export const processChartData = (
  currentEntries: { date: string; amount: number }[],
  previousEntries: { date: string; amount: number }[] | undefined,
  periodDuration: number,
  mode: DateSelectionMode,
  startDate: Date | null,
  prevStartDate: Date | null
): ChartEntry[] => {
  const entriesByDate = new Map<string, ChartEntry>();

  // Process current period entries
  currentEntries.forEach((entry) => {
    const date = parseDateSafely(entry.date);
    if (!date) return;

    const displayDate = formatChartDate(date);
    entriesByDate.set(displayDate, {
      displayDate,
      fullDate: date,
      current: entry.amount,
    });
  });

  // Process and align previous period entries
  previousEntries?.forEach((entry) => {
    const entryDate = parseDateSafely(entry.date);
    if (!entryDate || (mode === "manual" && !prevStartDate)) return;

    const alignedDate =
      mode === "auto"
        ? addDays(entryDate, periodDuration)
        : addDays(entryDate, differenceInDays(startDate!, prevStartDate!));
    const displayDate = formatChartDate(alignedDate);

    const existingEntry = entriesByDate.get(displayDate) || {
      displayDate,
      fullDate: alignedDate,
      current: 0,
    };
    entriesByDate.set(displayDate, {
      ...existingEntry,
      originalDate: formatChartDate(entryDate),
      previous: entry.amount,
    });
  });

  return Array.from(entriesByDate.values()).sort((a, b) => {
    return a.fullDate.getTime() - b.fullDate.getTime();
  });
};
