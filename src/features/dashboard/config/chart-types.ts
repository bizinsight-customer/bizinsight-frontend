import { FC } from "react";
import { AverageTicketChart } from "../components/charts/AverageTicketChart/AverageTicketChart";
import { ClientsMetrics } from "../components/charts/ClientsMetrics/ClientsMetrics";
import { CogsChart } from "../components/charts/CogsChart/CogsChart";
import { ExpenseCategoriesChart } from "../components/charts/ExpenseCategoriesChart/ExpenseCategoriesChart";
import { FacilityChargesChart } from "../components/charts/FacilityChargesChart/FacilityChargesChart";
import { MarketingChart } from "../components/charts/MarketingChart/MarketingChart";
import { ProfitChart } from "../components/charts/ProfitChart/ProfitChart";
import { ReturnRateChart } from "../components/charts/ReturnRateChart/ReturnRateChart";
import { RevenueChart } from "../components/charts/RevenueChart/RevenueChart";
import { RevenueExpenseRatioChart } from "../components/charts/RevenueExpenseRatioChart/RevenueExpenseRatioChart";
import { ROMIChart } from "../components/charts/ROMIChart/ROMIChart";
import { SalaryMetrics } from "../components/charts/SalaryMetrics/SalaryMetrics";
import { SalesChart } from "../components/charts/SalesChart/SalesChart";
import { StockProcurementChart } from "../components/charts/StockProcurementChart/StockProcurementChart";
import {
  ComparisonChartProps,
  SimpleChartProps,
} from "../components/charts/types/chart-props.types";
import { UnforeseenExpensesChart } from "../components/charts/UnforeseenExpensesChart/UnforeseenExpensesChart";

export type ChartType =
  | "revenue"
  | "profit"
  | "expense-categories"
  | "stock-procurement"
  | "facility-charges"
  | "sales"
  | "clients"
  | "salary"
  | "unforeseen-expenses"
  | "marketing"
  | "average-ticket"
  | "cogs"
  | "return-rate"
  | "revenue-expense-ratio"
  | "romi";

export interface ChartConfig {
  component: FC<ComparisonChartProps | SimpleChartProps>;
  title: string;
  includePreviousPeriod: boolean;
}

export const CHART_CONFIGS: Record<ChartType, ChartConfig> = {
  revenue: {
    component: RevenueChart,
    title: "Revenue Over Time",
    includePreviousPeriod: true,
  },
  profit: {
    component: ProfitChart,
    title: "Profit Over Time",
    includePreviousPeriod: true,
  },
  "expense-categories": {
    component: ExpenseCategoriesChart,
    title: "Expense Categories",
    includePreviousPeriod: false,
  },
  "stock-procurement": {
    component: StockProcurementChart,
    title: "Stock Procurement Expenses",
    includePreviousPeriod: false,
  },
  "facility-charges": {
    component: FacilityChargesChart,
    title: "Facility Charges",
    includePreviousPeriod: true,
  },
  sales: {
    component: SalesChart,
    title: "Sales Over Time",
    includePreviousPeriod: false,
  },
  clients: {
    component: ClientsMetrics,
    title: "Total Unique Clients",
    includePreviousPeriod: false,
  },
  salary: {
    component: SalaryMetrics,
    title: "Salary Metrics",
    includePreviousPeriod: false,
  },
  "unforeseen-expenses": {
    component: UnforeseenExpensesChart,
    title: "Unforeseen Expenses",
    includePreviousPeriod: false,
  },
  marketing: {
    component: MarketingChart,
    title: "Marketing Metrics",
    includePreviousPeriod: false,
  },
  "average-ticket": {
    component: AverageTicketChart,
    title: "Average Ticket Size",
    includePreviousPeriod: false,
  },
  cogs: {
    component: CogsChart,
    title: "Cost of Goods Sold",
    includePreviousPeriod: false,
  },
  "return-rate": {
    component: ReturnRateChart,
    title: "Return Rate",
    includePreviousPeriod: false,
  },
  "revenue-expense-ratio": {
    component: RevenueExpenseRatioChart,
    title: "Revenue vs Expenses",
    includePreviousPeriod: false,
  },
  romi: {
    component: ROMIChart,
    title: "Return on Marketing Investment",
    includePreviousPeriod: false,
  },
};
