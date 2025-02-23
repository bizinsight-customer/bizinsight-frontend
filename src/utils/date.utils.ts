import { ENV } from "@/config/env";
import { format, isValid, parse } from "date-fns";

/**
 * Converts format from ENV.DATE_TIME_FORMAT to date-fns format
 * @param envFormat - Format string from ENV.DATE_TIME_FORMAT
 * @returns date-fns compatible format string
 */
const convertToDateFnsFormat = (envFormat: string): string => {
  return envFormat
    .replace(/YYYY/g, "yyyy")
    .replace(/MM/g, "MM")
    .replace(/DD/g, "dd")
    .replace(/HH/g, "HH")
    .replace(/mm/g, "mm")
    .replace(/ss/g, "ss");
};

// Convert ENV format to date-fns format once
const DATE_FNS_FORMAT = convertToDateFnsFormat(ENV.DATE_TIME_FORMAT);

/**
 * Parses a date string according to the format specified in ENV.DATE_TIME_FORMAT
 * @param dateString - The date string to parse
 * @returns Date object if the string matches the format, null otherwise
 */
export const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;

  const parsedDate = parse(dateString, DATE_FNS_FORMAT, new Date());
  return isValid(parsedDate) ? parsedDate : null;
};

/**
 * Formats a Date object according to ENV.DATE_TIME_FORMAT
 * @param date - The Date object to format
 * @returns Formatted date string
 */
export const formatDate = (date: Date): string => {
  return format(date, DATE_FNS_FORMAT);
};

/**
 * Checks if a string can be parsed as a date according to ENV.DATE_TIME_FORMAT
 * @param value - The value to check
 * @returns true if the value can be parsed as a date
 */
export const isDateString = (value: unknown): boolean => {
  if (typeof value !== "string") return false;
  return parseDate(value) !== null;
};

/**
 * Attempts to parse a value as a date if it matches ENV.DATE_TIME_FORMAT
 * @param value - The value to parse
 * @returns Date object if parseable, original value otherwise
 */
export const parseDateIfPossible = <T>(value: T): Date | T => {
  if (typeof value === "string" && isDateString(value)) {
    const parsed = parseDate(value);
    if (parsed) return parsed;
  }
  return value;
};
