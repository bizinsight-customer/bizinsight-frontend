export type RecognizedData = Record<string, RecognizedValue>;

export type DocumentFields = Record<string, string | DocumentFields[]>;

export type RecognizedValuePrimitive = string | number | boolean | null;

export type RecognizedValue =
  | RecognizedValuePrimitive
  | RecognizedValue[]
  | Record<
      string,
      RecognizedValuePrimitive | Record<string, RecognizedValuePrimitive>
    >;
