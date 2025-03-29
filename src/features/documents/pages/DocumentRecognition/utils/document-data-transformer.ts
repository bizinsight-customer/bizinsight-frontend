import { get, set } from "lodash";
import {
  DocumentFields,
  RecognizedData,
  RecognizedValue,
  RecognizedValuePrimitive,
} from "../document-recognition.types";

export const getInputDefaultValue = (fieldType: string): RecognizedValue => {
  switch (fieldType) {
    case "number":
      return 0;
    case "boolean":
      return false;
    case "object":
      return {};
    case "array":
      return [];
    default:
      return "";
  }
};

export const flattenRecognizedData = (
  data: RecognizedData,
  parentKey = "",
  isArrayItem = false
): DocumentFields => {
  const result: DocumentFields = {};

  Object.entries(data).forEach(([key, value]) => {
    const fullKey = isArrayItem ? key : parentKey ? `${parentKey}.${key}` : key;

    if (value === null) {
      result[fullKey] = "";
    } else if (Array.isArray(value)) {
      // For arrays, we'll store them as a single string with values joined by commas
      result[fullKey] = value.join(", ");
    } else if (typeof value === "object") {
      const nestedFields = flattenRecognizedData(
        value as RecognizedData,
        fullKey,
        isArrayItem
      );
      Object.assign(result, nestedFields);
    } else {
      result[fullKey] = String(value);
    }
  });

  return result;
};

export const handleFieldValueChange = (
  prevData: RecognizedData,
  path: string,
  value: string
): RecognizedData => {
  // Create a deep copy of the data to avoid modifying read-only objects
  const newData = JSON.parse(JSON.stringify(prevData));
  const currentValue = get(newData, path);
  let newValue: RecognizedValue = value;

  if (typeof currentValue === "number") {
    const parsed = Number(value);
    if (!isNaN(parsed)) {
      newValue = parsed;
    }
  } else if (Array.isArray(currentValue)) {
    // If the current value is an array, split the input by commas
    newValue = value.split(",").map((item) => item.trim());
  }

  set(newData, path, newValue);
  return newData;
};

export const unflattenDocumentFields = (
  fields: DocumentFields
): RecognizedData => {
  const result: RecognizedData = {};

  Object.entries(fields).forEach(([key, value]) => {
    const parts = key.split(".");
    if (parts.length === 1) {
      // Handle non-nested fields
      result[key] = value as RecognizedValuePrimitive;
    } else {
      // Handle nested fields
      const [first, ...rest] = parts;
      if (!result[first]) {
        result[first] = {};
      }
      const nested = result[first] as Record<string, RecognizedValuePrimitive>;
      nested[rest.join(".")] = value as RecognizedValuePrimitive;
    }
  });

  return result;
};
