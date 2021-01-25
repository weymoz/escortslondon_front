export type SelectOption = {
  value: string;
  label: string;
  type?: 'hair' | 'boobs' | 'body';
};
export type EscortsFilterOptions = {
  location?: SelectOption[];
  price?: SelectOption[];
  services?: SelectOption[];
  physique: SelectOption[];
  new_tag?: boolean;
  recommended_tag?: boolean;
};
export type EscortsFilterOptionsPayload = {
  name: string;
  options?: SelectOption[];
};
export type EscortsFilterRequestParams = {
  location?: string[];
  price?: string[];
  services?: string[];
  hair?: string[];
  boobs?: string[];
  body?: string[];
  new_tag?: boolean;
  recommended_tag?: boolean;
};
