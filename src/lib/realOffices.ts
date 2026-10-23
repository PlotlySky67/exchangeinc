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
  { currency: "EUR", name: "Euro", buyFactor: 5.32 / 5.3447, sellFactor: 5.34 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.75 / 4.7519, sellFactor: 4.78 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.31 / 6.28, sellFactor: 6.33 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.75 / 5.73, sellFactor: 5.77 / 5.73 },
];

const BIVOLARIE_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.32 / 5.3447, sellFactor: 5.35 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.75 / 4.7519, sellFactor: 4.79 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.3 / 6.28, sellFactor: 6.36 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.7 / 5.73, sellFactor: 5.75 / 5.73 },
];

const ARIANA_MOSILOR_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.34 / 5.3447, sellFactor: 5.355 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.76 / 4.7519, sellFactor: 4.785 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.33 / 6.28, sellFactor: 6.369 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.742 / 5.73, sellFactor: 5.78 / 5.73 },
];
const HOLUX_MOSILOR_241_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.26 / 5.3447, sellFactor: 5.284 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.6 / 4.7519, sellFactor: 4.65 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.065 / 6.28, sellFactor: 6.1 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.53 / 5.73, sellFactor: 5.59 / 5.73 },
];
const HOLUX_UNIRII_COPOSU_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.335 / 5.3447, sellFactor: 5.359 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.715 / 4.7519, sellFactor: 4.785 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.33 / 6.28, sellFactor: 6.365 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.735 / 5.73, sellFactor: 5.765 / 5.73 },
];
const DIAMANT_PIATA_UNIRII_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.34 / 5.3447, sellFactor: 5.365 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.75 / 4.7519, sellFactor: 4.79 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.26 / 6.28, sellFactor: 6.35 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.67 / 5.73, sellFactor: 5.75 / 5.73 },
];

const INNOVA_UNIRII_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.34 / 5.3447, sellFactor: 5.353 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.76 / 4.7519, sellFactor: 4.785 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.33 / 6.28, sellFactor: 6.36 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.74 / 5.73, sellFactor: 5.78 / 5.73 },
];

const MONDIAL_EXCHANGE_IASI_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.3019 / 5.3447, sellFactor: 5.36 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.725 / 4.7519, sellFactor: 4.8 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.235 / 6.28, sellFactor: 6.4 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.7 / 5.73, sellFactor: 5.81 / 5.73 },
];

const TRANSILVANIA_WU_CLUJ_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.325 / 5.3447, sellFactor: 5.349 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.73 / 4.7519, sellFactor: 4.77 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.325 / 6.28, sellFactor: 6.365 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.735 / 5.73, sellFactor: 5.78 / 5.73 },
];

const CSV_NARCOS_REVOLUTIEI_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.31 / 5.3447, sellFactor: 5.34 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.7 / 4.7519, sellFactor: 4.75 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.25 / 6.28, sellFactor: 6.33 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.65 / 5.73, sellFactor: 5.73 / 5.73 },
];

const NONSTOP_GRANDPACT_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.3469 / 5.3447, sellFactor: 5.351 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.769 / 4.7519, sellFactor: 4.77 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.3409 / 6.28, sellFactor: 6.36 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.7489 / 5.73, sellFactor: 5.78 / 5.73 },
];

const CANDY_EXCHANGE_BRASOV_RATES: RealOfficeRateSpread[] = [
  { currency: "EUR", name: "Euro", buyFactor: 5.32 / 5.3447, sellFactor: 5.37 / 5.3447 },
  { currency: "USD", name: "Dolar american", buyFactor: 4.67 / 4.7519, sellFactor: 4.75 / 4.7519 },
  { currency: "GBP", name: "Liră sterlină", buyFactor: 6.18 / 6.28, sellFactor: 6.26 / 6.28 },
  { currency: "CHF", name: "Franc elvețian", buyFactor: 5.64 / 5.73, sellFactor: 5.72 / 5.73 },
];

// Real, manually-entered exchange office spreads (not synthetic/demo data).
// Keyed by "judetSlug:orasSlug". Add more offices as they're supplied.
export const REAL_OFFICES: Record<string, RealOffice[]> = {
  "suceava:suceava": [
    {
      name: "Casa CID Exchange Suceava",
      city: "Suceava",
      rates: CID_EXCHANGE_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-23",
      capturedTime: "12:30",
    },
  ],
  "suceava:vicovu-de-sus": [
    {
      name: "Casa de Schimb Valutar Bivolărie",
      city: "Vicovu de Sus",
      rates: BIVOLARIE_RATES,
      source: "Facebook",
      capturedDate: "2026-10-23",
    },
  ],
  "bucuresti:bucuresti": [
    {
      name: "Ariana Exchange Mosilor",
      city: "București",
      rates: ARIANA_MOSILOR_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-23",
      capturedTime: "13:46",
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
      capturedDate: "2026-10-23",
      capturedTime: "15:12",
    },
    {
      name: "Diamant Exchange / Piața Unirii",
      city: "București",
      rates: DIAMANT_PIATA_UNIRII_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-23",
      capturedTime: "11:22",
    },
    {
      name: "Innova Unirii",
      city: "București",
      rates: INNOVA_UNIRII_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-23",
      capturedTime: "12:57",
    },
  ],
  "iasi:iasi": [
    {
      name: "Mondial Exchange",
      city: "Iași, Centru",
      rates: MONDIAL_EXCHANGE_IASI_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-23",
      capturedTime: "13:09",
    },
  ],
  "cluj:cluj-napoca": [
    {
      name: "Transilvania Exchange Western Union",
      city: "Cluj-Napoca",
      rates: TRANSILVANIA_WU_CLUJ_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-23",
      capturedTime: "15:02",
    },
  ],
  "timis:timisoara": [
    {
      name: "CSV Narcos Revoluției",
      city: "Timișoara",
      rates: CSV_NARCOS_REVOLUTIEI_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-23",
      capturedTime: "08:03",
    },
  ],
  "constanta:constanta": [
    {
      name: "Non-Stop Exchange GRANDPACT",
      city: "Constanța",
      rates: NONSTOP_GRANDPACT_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-23",
      capturedTime: "14:41",
    },
  ],
  "brasov:brasov": [
    {
      name: "SC Exchange Office Candy SRL",
      city: "Brașov",
      rates: CANDY_EXCHANGE_BRASOV_RATES,
      source: "valutare.ro",
      capturedDate: "2026-10-12",
      capturedTime: "10:50",
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
