export type HttpMetod = 'get' | 'post' | 'put' | 'patch';

//Types from Filter API

export interface EscortIndexed {
  id?: string;
  title?: string;
  location?: string;
  services?: string[];
  hair?: string;
  bodyType?: string;
  bust?: string;
  incallRate?: number;
  outcallRate?: number;
  imageUrl?: string | undefined;
  newTag?: boolean;
  recommendedTag?: boolean;
}
