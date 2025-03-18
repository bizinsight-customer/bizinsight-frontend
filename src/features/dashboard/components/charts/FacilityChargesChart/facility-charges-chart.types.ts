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
