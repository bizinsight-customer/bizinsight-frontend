// User types from OpenAPI spec
export interface UserBase {
  email: string;
  first_name: string;
  last_name: string;
  is_active?: boolean;
  is_superuser?: boolean;
  is_verified?: boolean;
}

export interface UserCreate extends UserBase {
  password: string;
}

export interface UserRead extends UserBase {
  id: string;
}

export interface UserUpdate extends Partial<UserBase> {
  password?: string;
  first_name: string;
  last_name: string;
}

// Auth types
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  email: string;
  password: string;
  name: string;
}

export interface AuthTokens {
  access: string;
  refresh: string;
}

export interface User {
  id: number;
  email: string;
  name: string;
}

export interface AuthResponse {
  user: User;
  tokens: AuthTokens;
}

export interface BearerResponse {
  access_token: string;
  token_type: string;
}

// Error types
export interface ValidationError {
  loc: (string | number)[];
  msg: string;
  type: string;
}

export interface HTTPValidationError {
  detail: ValidationError[];
}

export interface ErrorModel {
  detail: string | Record<string, string>;
}
