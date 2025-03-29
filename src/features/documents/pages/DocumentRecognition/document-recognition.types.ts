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

export interface ValidationErrorContext {
  error: string;
}

export interface ValidationError {
  type: string;
  loc: string[];
  msg: string;
  input: string;
  ctx?: ValidationErrorContext;
  url?: string;
}

export interface ValidationErrorResponse {
  detail: ValidationError[];
}

export type FieldErrors = {
  [key: string]: string | FieldErrors;
};
