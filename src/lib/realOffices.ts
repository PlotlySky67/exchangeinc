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
  source?: string;
  // Fixed date (YYYY-MM-DD) the quote was captured, shown instead of
  // today's date when the office's board photo/source has its own date.
  capturedDate?: string;
}

const CID_EXCHANGE_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.2389 / 5.26, sellFactor: 5.25 / 5.26 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.5529 / 4.52, sellFactor: 4.59 / 4.52 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.0819 / 6.06, sellFactor: 6.1 / 6.06 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.5129 / 5.5, sellFactor: 5.54 / 5.5 },
];

const BIVOLARIE_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.23 / 5.26, sellFactor: 5.27 / 5.26 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.53 / 4.52, sellFactor: 4.6 / 4.52 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.07 / 6.06, sellFactor: 6.12 / 6.06 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.5 / 5.5, sellFactor: 5.56 / 5.5 },
];

// Real, manually-entered exchange office spreads (not synthetic/demo data).
// Keyed by "judetSlug:orasSlug". Add more offices as they're supplied.
export const REAL_OFFICES: Record<string, RealOffice[]> = {
  "suceava:suceava": [
    {
      name: "Casa CID Exchange Suceava",
      city: "Suceava",
      rates: CID_EXCHANGE_RATES,
      source: "valutare.com",
    },
  ],
  "suceava:vicovu-de-sus": [
    {
      name: "Casa de Schimb Valutar Bivolărie",
      city: "Vicovu de Sus",
      rates: BIVOLARIE_RATES,
      source: "Facebook",
      capturedDate: "2026-09-17",
    },
  ],
};
