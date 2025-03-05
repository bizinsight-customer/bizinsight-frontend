export type DateSelectionMode = "auto" | "manual";

export interface ChartEntry {
  displayDate: string;
  originalDate?: string;
  current?: number;
  previous?: number;
}

export interface DateSelectionProps {
  mode: DateSelectionMode;
  startDate: Date | null;
  endDate: Date | null;
  prevStartDate: Date | null;
  prevEndDate: Date | null;
  periodDays: number;
  onModeChange: (mode: DateSelectionMode) => void;
  onStartDateChange: (date: Date | null) => void;
  onEndDateChange: (date: Date | null) => void;
  onPrevStartDateChange: (date: Date | null) => void;
  onPeriodDaysChange: (days: number) => void;
}

export const DATE_FORMAT = "dd.MM.yyyy";
