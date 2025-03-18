export type DateSelectionMode = "auto" | "manual";

export interface BaseDateProps {
  startDate: Date | null;
  endDate: Date | null;
}

export interface ComparisonDateProps extends BaseDateProps {
  mode: DateSelectionMode;
  prevStartDate: Date | null;
  prevEndDate: Date | null;
  periodDays: number;
}

export type SimpleChartProps = BaseDateProps;
export type ComparisonChartProps = ComparisonDateProps;
