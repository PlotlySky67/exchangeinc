export interface RealOfficeRateSpread {
  currency: string;
  name: string;
  // Multipliers captured from a real quote, relative to the BNR reference
  // rate at the time. Applying them to today's reference rate keeps the
  // office's quote tracking the current day instead of being frozen on the
  // day it was captured.
  //
  // IMPORTANT: the divisor below must be kept close to the actual BNR rate
  // on each quote's capture date (currently anchored to 2 Oct 2026: EUR
  // 5.3447, USD 4.7519, GBP 6.28, CHF 5.73 — see src/lib/bnr.ts
  // FALLBACK_RATES). If BNR drifts far from this anchor without rebasing
  // these divisors, displayed office rates will drift away from their real
  // quoted values — rebase periodically (or whenever rates look off).
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
  // Time of day (e.g. "11:03") the quote was captured, shown on the right
  // side of the office card header alongside capturedDate. Omitted when
  // the source doesn't give a specific time.
  capturedTime?: string;
}

const CID_EXCHANGE_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.27 / 5.3447, sellFactor: 5.32 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.65 / 4.7519, sellFactor: 4.74 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.14 / 6.28, sellFactor: 6.22 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.64 / 5.73, sellFactor: 5.7 / 5.73 },
];

const BIVOLARIE_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.28 / 5.3447, sellFactor: 5.33 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.65 / 4.7519, sellFactor: 4.75 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.15 / 6.28, sellFactor: 6.25 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.6 / 5.73, sellFactor: 5.71 / 5.73 },
];

const ARIANA_MOSILOR_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.267 / 5.3447, sellFactor: 5.285 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.615 / 4.7519, sellFactor: 4.65 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.075 / 6.28, sellFactor: 6.12 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.556 / 5.73, sellFactor: 5.599 / 5.73 },
];
const HOLUX_MOSILOR_241_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.26 / 5.3447, sellFactor: 5.284 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.6 / 4.7519, sellFactor: 4.65 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.065 / 6.28, sellFactor: 6.1 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.53 / 5.73, sellFactor: 5.59 / 5.73 },
];
const HOLUX_UNIRII_COPOSU_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.25 / 5.3447, sellFactor: 5.284 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.6 / 4.7519, sellFactor: 4.64 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.065 / 6.28, sellFactor: 6.1 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.53 / 5.73, sellFactor: 5.59 / 5.73 },
];
const PRESTIGE_GARA_DE_NORD_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.265 / 5.3447, sellFactor: 5.29 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.51 / 4.7519, sellFactor: 4.598 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 5.99 / 6.28, sellFactor: 6.14 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.45 / 5.73, sellFactor: 5.648 / 5.73 },
];
const DIAMANT_PIATA_UNIRII_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.32 / 5.3447, sellFactor: 5.43 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.65 / 4.7519, sellFactor: 4.76 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.1 / 6.28, sellFactor: 6.24 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.53 / 5.73, sellFactor: 5.69 / 5.73 },
];

const FACTORY_EXCHANGE_IASI_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.3105 / 5.3447, sellFactor: 5.368 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.6305 / 4.7519, sellFactor: 4.768 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.1305 / 6.28, sellFactor: 6.268 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.6205 / 5.73, sellFactor: 5.768 / 5.73 },
];
const MONDIAL_EXCHANGE_IASI_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.28 / 5.3447, sellFactor: 5.37 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.625 / 4.7519, sellFactor: 4.77 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.125 / 6.28, sellFactor: 6.27 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.6057 / 5.73, sellFactor: 5.77 / 5.73 },
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
      capturedDate: "2026-10-03",
      capturedTime: "13:16",
    },
  ],
  "suceava:vicovu-de-sus": [
    {
      name: "Casa de Schimb Valutar Bivolărie",
      city: "Vicovu de Sus",
      rates: BIVOLARIE_RATES,
      source: "Facebook",
      capturedDate: "2026-10-03",
    },
  ],
  "bucuresti:bucuresti": [
    {
      name: "Ariana Exchange Mosilor",
      city: "București",
      rates: ARIANA_MOSILOR_RATES,
      source: "valutare.ro",
      capturedDate: "2026-09-25",
      capturedTime: "11:03",
    },
    {
      name: "Holux Exchange Mosilor 241",
      city: "București",
      rates: HOLUX_MOSILOR_241_RATES,
      source: "valutare.ro",
      capturedDate: "2026-09-25",
      capturedTime: "10:38",
    },
    {
      name: "Holux Exchange Unirii Coposu Nr. 4",
      city: "București",
      rates: HOLUX_UNIRII_COPOSU_RATES,
      source: "valutare.ro",
      capturedDate: "2026-09-25",
      capturedTime: "11:07",
    },
    {
      name: "Prestige Exchange House Gara de Nord-Grivița",
      city: "București",
      rates: PRESTIGE_GARA_DE_NORD_RATES,
      source: "valutare.ro",
      capturedDate: "2026-09-22",
    },
    {
      name: "Diamant Exchange / Piața Unirii",
      city: "București",
      rates: DIAMANT_PIATA_UNIRII_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-02",
      capturedTime: "14:32",
    },
  ],
  "iasi:iasi": [
    {
      name: "Factory Exchange",
      city: "Iași",
      rates: FACTORY_EXCHANGE_IASI_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-02",
    },
    {
      name: "Mondial Exchange",
      city: "Iași, Centru",
      rates: MONDIAL_EXCHANGE_IASI_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-03",
      capturedTime: "08:38",
    },
  ],
};

// Sorts offices by capture date/time, most recent first. Offices with no
// capturedDate (implicitly "today") sort to the top; capturedLabel-only
// offices (free-form text, not reliably parseable) sort after dated ones.
export function sortOfficesByRecency(offices: RealOffice[]): RealOffice[] {
  const todayKey = new Date().toISOString().slice(0, 10) + " 23:59";

  function sortKey(office: RealOffice): string {
    if (office.capturedDate) {
      return `${office.capturedDate} ${office.capturedTime ?? "00:00"}`;
    }
    if (office.capturedLabel) {
      return "0000-00-00 00:00";
    }
    return todayKey;
  }

  return [...offices].sort((a, b) => sortKey(b).localeCompare(sortKey(a)));
}
