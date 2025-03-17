import { get, set } from "lodash";
import {
  DocumentFields,
  RecognizedData,
  RecognizedValue,
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
      result[fullKey] = value.map((item) =>
        typeof item === "object" && item !== null
          ? flattenRecognizedData(item as RecognizedData, fullKey, true)
          : String(item)
      );
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
  const newData = { ...prevData };
  const currentValue = get(newData, path);
  let newValue: RecognizedValue = value;

  if (typeof currentValue === "number") {
    const parsed = Number(value);
    if (!isNaN(parsed)) {
      newValue = parsed;
    }
  }

  set(newData, path, newValue);
  return newData;
};

export const unflattenDocumentFields = (
  fields: DocumentFields
): Record<string, string | DocumentFields[]> => {
  const result: Record<string, string | DocumentFields[]> = {};

  Object.entries(fields).forEach(([key, value]) => {
    const parts = key.split(".");
    if (parts.length === 1) {
      // Handle non-nested fields
      result[key] = value;
    } else {
      // Handle nested fields
      const [first, ...rest] = parts;
      if (!result[first]) {
        result[first] = {};
      }
      const nested = result[first] as DocumentFields;
      nested[rest.join(".")] = value;
    }
  });

  return result;
};
