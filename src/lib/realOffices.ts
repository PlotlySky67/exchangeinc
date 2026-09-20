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
  // Literal display text (e.g. "20 septembrie 14:45") used instead of
  // capturedDate when a specific time is also known. Rendered verbatim,
  // so it avoids any timezone-parsing ambiguity.
  capturedLabel?: string;
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

const ARIANA_MOSILOR_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.26 / 5.26, sellFactor: 5.279 / 5.26 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.56 / 4.52, sellFactor: 4.599 / 4.52 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.08 / 6.06, sellFactor: 6.12 / 6.06 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.52 / 5.5, sellFactor: 5.57 / 5.5 },
];
const HOLUX_MOSILOR_241_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.26 / 5.26, sellFactor: 5.279 / 5.26 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.56 / 4.52, sellFactor: 4.595 / 4.52 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.07 / 6.06, sellFactor: 6.12 / 6.06 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.5 / 5.5, sellFactor: 5.56 / 5.5 },
];
const HOLUX_UNIRII_COPOSU_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.26 / 5.26, sellFactor: 5.28 / 5.26 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.56 / 4.52, sellFactor: 4.595 / 4.52 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.08 / 6.06, sellFactor: 6.12 / 6.06 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.52 / 5.5, sellFactor: 5.56 / 5.5 },
];
const PRESTIGE_GARA_DE_NORD_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.265 / 5.26, sellFactor: 5.29 / 5.26 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.51 / 4.52, sellFactor: 4.598 / 4.52 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 5.99 / 6.06, sellFactor: 6.14 / 6.06 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.45 / 5.5, sellFactor: 5.648 / 5.5 },
];
const DIAMANT_PIATA_UNIRII_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.25 / 5.26, sellFactor: 5.285 / 5.26 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.53 / 4.52, sellFactor: 4.595 / 4.52 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.03 / 6.06, sellFactor: 6.12 / 6.06 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.5 / 5.5, sellFactor: 5.57 / 5.5 },
];

// GBP/CHF not supplied yet for these offices.
const PANDA_EXCHANGE_IASI_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.232 / 5.26, sellFactor: 5.248 / 5.26 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.502 / 4.52, sellFactor: 4.588 / 4.52 },
];
const FACTORY_EXCHANGE_IASI_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.2345 / 5.26, sellFactor: 5.247 / 5.26 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.5105 / 4.52, sellFactor: 4.584 / 4.52 },
];
const MONDIAL_EXCHANGE_IASI_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.2025 / 5.26, sellFactor: 5.275 / 5.26 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.5025 / 4.52, sellFactor: 4.58 / 4.52 },
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
  "bucuresti:bucuresti": [
    {
      name: "Ariana Exchange Mosilor",
      city: "București",
      rates: ARIANA_MOSILOR_RATES,
      source: "valutare.ro",
      capturedLabel: "20 septembrie 14:45",
    },
    {
      name: "Holux Exchange Mosilor 241",
      city: "București",
      rates: HOLUX_MOSILOR_241_RATES,
      source: "valutare.ro",
      capturedLabel: "20 septembrie 14:45",
    },
    {
      name: "Holux Exchange Unirii Coposu Nr. 4",
      city: "București",
      rates: HOLUX_UNIRII_COPOSU_RATES,
      source: "valutare.ro",
      capturedLabel: "20 septembrie 14:45",
    },
    {
      name: "Prestige Exchange House Gara de Nord-Grivița",
      city: "București",
      rates: PRESTIGE_GARA_DE_NORD_RATES,
      source: "valutare.ro",
      capturedLabel: "20 septembrie 14:45",
    },
    {
      name: "Diamant Exchange / Piața Unirii",
      city: "București",
      rates: DIAMANT_PIATA_UNIRII_RATES,
      source: "valutare.ro",
      capturedLabel: "20 septembrie 14:45",
    },
  ],
  "iasi:iasi": [
    {
      name: "Panda Exchange",
      city: "Iași, Centru",
      rates: PANDA_EXCHANGE_IASI_RATES,
      source: "valutare.ro",
      capturedDate: "2026-09-17",
    },
    {
      name: "Factory Exchange",
      city: "Iași",
      rates: FACTORY_EXCHANGE_IASI_RATES,
      source: "valutare.ro",
      capturedDate: "2026-09-17",
    },
    {
      name: "Mondial Exchange",
      city: "Iași, Centru",
      rates: MONDIAL_EXCHANGE_IASI_RATES,
      source: "valutare.ro",
      capturedDate: "2026-09-19",
    },
  ],
};
