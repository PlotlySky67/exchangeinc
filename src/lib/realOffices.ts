export interface RealOfficeRate {
  currency: string;
  name: string;
  buy: number;
  sell: number;
}

export interface RealOffice {
  name: string;
  city: string;
  rates: RealOfficeRate[];
}

// Real, manually-entered exchange office rates (not synthetic/demo data).
// Keyed by județ slug. Add more offices/județe here as they're supplied.
export const REAL_OFFICES: Record<string, RealOffice[]> = {
  suceava: [
    {
      name: "Casa CID Exchange Suceava",
      city: "Suceava",
      rates: [
        { currency: "EUR", name: "Euro", buy: 5.2389, sell: 5.25 },
        { currency: "USD", name: "Dolar american", buy: 4.5529, sell: 4.59 },
        { currency: "GBP", name: "Liră sterlină", buy: 6.0819, sell: 6.1 },
        { currency: "CHF", name: "Franc elvețian", buy: 5.5129, sell: 5.54 },
      ],
    },
  ],
};
