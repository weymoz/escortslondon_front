export interface EscortData {
  id: string;
  title: string;
  photos: AssetData[];
  rates: RatesData;
  tags: string[];
  location: string;
}

export interface AssetData {
  sys: {
    id: string;
  };
}

export interface RatesData {
  usd: RatesForCurrency;
  eur: RatesForCurrency;
  gbp: RatesForCurrency;
}

export interface RatesForCurrency {
  '1_One hour': PriceData;
  '2_90 minutes': PriceData;
  '3_Two hours': PriceData;
  '4_Three hours': PriceData;
  '5_Additional hour': PriceData;
  '6_Overnight': PriceData;
}

export interface PriceData {
  incall: number;
  outcall: number;
}
