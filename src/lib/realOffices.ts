export interface RealOfficeRateSpread {
  currency: string;
  name: string;
  // Multipliers captured from a real quote, relative to the BNR reference
  // rate at the time (EUR 5.26, USD 4.52, GBP 6.06, CHF 5.50). Applying them
  // to today's reference rate keeps the office's quote tracking the current
  // day instead of being frozen on the day it was captured.
  buyFactor: number;
  sellFactor: number;
}

export interface RealOffice {
  name: string;
  city: string;
  rates: RealOfficeRateSpread[];
}

const CID_EXCHANGE_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.2389 / 5.26, sellFactor: 5.25 / 5.26 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.5529 / 4.52, sellFactor: 4.59 / 4.52 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.0819 / 6.06, sellFactor: 6.1 / 6.06 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.5129 / 5.5, sellFactor: 5.54 / 5.5 },
];

// Real, manually-entered exchange office spreads (not synthetic/demo data).
// Keyed by "judetSlug:orasSlug". Add more offices as they're supplied.
export const REAL_OFFICES: Record<string, RealOffice[]> = {
  "suceava:suceava": [
    {
      name: "Casa CID Exchange Suceava",
      city: "Suceava",
      rates: CID_EXCHANGE_RATES,
    },
  ],
  "suceava:radauti": [
    {
      name: "Casa CID Exchange Suceava",
      city: "Rădăuți",
      rates: CID_EXCHANGE_RATES,
    },
  ],
  "suceava:vicovu-de-sus": [
    {
      // No distinct rates supplied yet for this office — reusing the same
      // spread as Casa CID Exchange until real figures are provided.
      name: "Schimb Valutar Bivolărie",
      city: "Vicovu de Sus",
      rates: CID_EXCHANGE_RATES,
    },
  ],
};
