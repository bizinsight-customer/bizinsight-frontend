/**
 * @deprecated These types are deprecated. Please use types from src/types/api-updated.types.ts instead.
 * This file will be removed in future versions.
 */

export interface ApiResponse<T> {
  data: T;
  message?: string;
}

export interface ApiError {
  message: string;
  errors?: Record<string, string[]>;
  status?: number;
}

export enum DocumentType {
  INVOICE = "INVOICE",
  SALARY = "SALARY",
  FACILITY_CHARGES = "FACILITY_CHARGES",
  PAYMENT_CONFIRMATION = "PAYMENT_CONFIRMATION",
  TAX = "TAX",
  MARKETING = "MARKETING",
  LOGISTICS = "LOGISTICS",
  REFUND = "REFUND",
  CUSTOMS = "CUSTOMS",
  UNFORESEEN_EXPENSE = "UNFORESEEN_EXPENSE",
  STOCK_PROCUREMENT = "STOCK_PROCUREMENT",
  STOCK_PROCUREMENT_OTHER = "STOCK_PROCUREMENT_OTHER",
}

export enum Currency {
  USD = "USD",
  EUR = "EUR",
  GBP = "GBP",
  JPY = "JPY",
  CNY = "CNY",
  AUD = "AUD",
  CAD = "CAD",
  CHF = "CHF",
  HKD = "HKD",
  NZD = "NZD",
  SGD = "SGD",
  DKK = "DKK",
  NOK = "NOK",
  SEK = "SEK",
  PLN = "PLN",
  CZK = "CZK",
  HUF = "HUF",
  RON = "RON",
  BGN = "BGN",
  HRK = "HRK",
  INR = "INR",
  IDR = "IDR",
  KRW = "KRW",
  MYR = "MYR",
  PHP = "PHP",
  THB = "THB",
  VND = "VND",
  TWD = "TWD",
  AED = "AED",
  SAR = "SAR",
  ILS = "ILS",
  TRY = "TRY",
  QAR = "QAR",
  BHD = "BHD",
  KWD = "KWD",
  MXN = "MXN",
  BRL = "BRL",
  ARS = "ARS",
  CLP = "CLP",
  COP = "COP",
  PEN = "PEN",
  ZAR = "ZAR",
  EGP = "EGP",
  NGN = "NGN",
  KES = "KES",
  MAD = "MAD",
  GHS = "GHS",
  FJD = "FJD",
  PGK = "PGK",
  WST = "WST",
  BTC = "BTC",
  ETH = "ETH",
  USDT = "USDT",
}

export enum BalanceChangeType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
}
