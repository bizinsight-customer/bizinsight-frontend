export interface CompanyData {
  name: string | null;
  tax_number: string | null;
  registration_number: string | null;
  legal_address: string | null;
  postal_address: string | null;
  phone: string | null;
  bank_name: string | null;
  bank_account: string | null;
  bank_swift: string | null;
}

export type CompanyUpdateData = CompanyData;
