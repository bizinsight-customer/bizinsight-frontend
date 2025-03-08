export interface CurrencyInfo {
  code: string;
  name: string;
}

export interface UserSettingsStatus {
  has_system_currency: boolean;
}

export interface UserSettingsUpdate {
  system_currency: string;
}

export interface User {
  email: string;
  display_name: string | null;
  is_active: boolean;
  id: string;
  firebase_uid: string;
  created_at: string;
  updated_at: string;
}
