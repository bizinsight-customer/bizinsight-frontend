/**
 * Type for a nested object structure where values can be primitives or nested objects
 */
export type NestedObject = {
  [key: string]: string | number | boolean | null | NestedObject;
};

/**
 * Transforms a flattened object with dot notation keys into a nested object structure
 * Example:
 * Input: { "person.name": "John", "person.address.city": "NY" }
 * Output: { person: { name: "John", address: { city: "NY" } } }
 */
export const unflattenObject = (
  obj: Record<string, string | number | boolean | null>
): NestedObject => {
  const result: NestedObject = {};

  for (const key in obj) {
    const value = obj[key];
    const parts = key.split(".");

    let current = result;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (i === parts.length - 1) {
        current[part] = value;
      } else {
        current[part] = (current[part] as NestedObject) || {};
        current = current[part] as NestedObject;
      }
    }
  }

  return result;
};
