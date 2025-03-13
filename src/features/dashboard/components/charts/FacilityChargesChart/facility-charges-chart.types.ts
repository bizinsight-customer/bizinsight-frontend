import { DateSelectionMode } from "../RevenueChart/revenue-chart.types";

export interface FacilityChargesChartProps {
  mode: DateSelectionMode;
  startDate: Date | null;
  endDate: Date | null;
  prevStartDate: Date | null;
  prevEndDate: Date | null;
  periodDays: number;
}

export interface ChartEntry {
  displayDate: string;
  fullDate: Date;
  current: number;
  previous?: number;
  originalDate?: string;
}

export interface ChartData {
  water: ChartEntry[];
  electricity: ChartEntry[];
  rent: ChartEntry[];
  other: ChartEntry[];
}
