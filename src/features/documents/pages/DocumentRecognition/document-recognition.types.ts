export type RecognizedData = Record<string, RecognizedValue>;

export type DocumentFields = Record<string, string>;

export type RecognizedValuePrimitive = string | number | boolean | null;

export type RecognizedValue =
  | RecognizedValuePrimitive
  | Record<
      string,
      RecognizedValuePrimitive | Record<string, RecognizedValuePrimitive>
    >;
