import { XMLParser } from "fast-xml-parser";

// Official public data feeds published by the National Bank of Romania (BNR).
// Docs: https://www.bnr.ro/Cursul-de-schimb-3544.aspx
const BNR_DAILY_URL = "https://www.bnr.ro/nbrfxrates.xml";
const BNR_YEARLY_URL = (year: number) =>
  `https://www.bnr.ro/files/xml/years/nbrfxrates${year}.xml`;

export interface RateEntry {
  currency: string;
  multiplier: number;
  rate: number; // RON per `multiplier` units of `currency`
}

export interface RatesSnapshot {
  date: string; // YYYY-MM-DD
  rates: RateEntry[];
  source: "live" | "fallback";
}

export interface HistoryPoint {
  date: string;
  rate: number;
}

const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: "@_" });

// Fallback snapshot used when the live BNR feed can't be reached (e.g. offline
// dev environments). Values are a realistic mid-2026 reference point — the UI
// always labels this as cached/sample data rather than presenting it as live.
const FALLBACK_DATE = "2026-08-11";
const FALLBACK_RATES: RateEntry[] = [
  { currency: "EUR", multiplier: 1, rate: 5.0784 },
  { currency: "USD", multiplier: 1, rate: 4.3821 },
  { currency: "GBP", multiplier: 1, rate: 5.8674 },
  { currency: "CHF", multiplier: 1, rate: 5.4312 },
  { currency: "JPY", multiplier: 100, rate: 2.9812 },
  { currency: "CAD", multiplier: 1, rate: 3.1854 },
  { currency: "AUD", multiplier: 1, rate: 2.8967 },
  { currency: "CNY", multiplier: 1, rate: 0.6104 },
  { currency: "HUF", multiplier: 100, rate: 1.3298 },
  { currency: "PLN", multiplier: 1, rate: 1.1786 },
  { currency: "BGN", multiplier: 1, rate: 2.5967 },
  { currency: "TRY", multiplier: 1, rate: 0.1287 },
  { currency: "MDL", multiplier: 1, rate: 0.2534 },
  { currency: "NOK", multiplier: 1, rate: 0.4321 },
  { currency: "SEK", multiplier: 1, rate: 0.4587 },
  { currency: "DKK", multiplier: 1, rate: 0.6806 },
  { currency: "CZK", multiplier: 1, rate: 0.2043 },
  { currency: "XAU", multiplier: 1, rate: 412.35 },
];

function fallbackSnapshot(): RatesSnapshot {
  return { date: FALLBACK_DATE, rates: FALLBACK_RATES, source: "fallback" };
}

function toArray<T>(value: T | T[] | undefined): T[] {
  if (value === undefined) return [];
  return Array.isArray(value) ? value : [value];
}

// Time-based safety net: even if nothing ever calls /api/revalidate, every
// cached page/route refetches BNR on its own within this many seconds. BNR
// only republishes once a day (~13:00-13:15 Bucharest time), so this just
// bounds the worst-case staleness — the cron hitting /api/revalidate is what
// makes the update feel instant.
const RATES_REVALIDATE_SECONDS = 300;
const HISTORY_REVALIDATE_SECONDS = 3600;

export async function getDailyRates(): Promise<RatesSnapshot> {
  try {
    const res = await fetch(BNR_DAILY_URL, {
      next: { revalidate: RATES_REVALIDATE_SECONDS, tags: ["bnr-rates"] },
    });
    if (!res.ok) throw new Error(`BNR daily feed responded ${res.status}`);
    const xml = await res.text();
    const doc = parser.parse(xml);
    const cube = doc?.DataSet?.Body?.Cube;
    const date: string | undefined = cube?.["@_date"];
    const rawRates = toArray(cube?.Rate);
    const rates: RateEntry[] = rawRates
      .map((r: Record<string, unknown>) => ({
        currency: String(r["@_currency"] ?? ""),
        multiplier: Number(r["@_multiplier"] ?? 1),
        rate: Number(r["#text"]),
      }))
      .filter((r) => r.currency && Number.isFinite(r.rate));

    if (!date || rates.length === 0) throw new Error("Malformed BNR daily feed");

    return { date, rates, source: "live" };
  } catch {
    return fallbackSnapshot();
  }
}

export async function getRate(currency: string): Promise<RateEntry | undefined> {
  const snapshot = await getDailyRates();
  return snapshot.rates.find((r) => r.currency === currency.toUpperCase());
}

function synthesizeHistory(currency: string, days: number): HistoryPoint[] {
  const base = FALLBACK_RATES.find((r) => r.currency === currency.toUpperCase())?.rate ?? 5;
  const points: HistoryPoint[] = [];
  const end = new Date(FALLBACK_DATE);
  // Deterministic pseudo-random walk so the fallback chart is stable across renders.
  let seed = currency.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  let value = base * 0.985;
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    value += (rand() - 0.5) * base * 0.004;
    points.push({ date: d.toISOString().slice(0, 10), rate: Number(value.toFixed(4)) });
  }
  points[points.length - 1] = { date: FALLBACK_DATE, rate: base };
  return points;
}

export async function getHistory(currency: string, days = 90): Promise<{
  points: HistoryPoint[];
  source: "live" | "fallback";
}> {
  const code = currency.toUpperCase();
  const now = new Date();
  const years = Array.from(new Set([now.getFullYear(), now.getFullYear() - 1]));

  try {
    const allPoints: HistoryPoint[] = [];

    for (const year of years) {
      const res = await fetch(BNR_YEARLY_URL(year), {
        next: { revalidate: HISTORY_REVALIDATE_SECONDS, tags: ["bnr-history"] },
      });
      if (!res.ok) continue;
      const xml = await res.text();
      const doc = parser.parse(xml);
      const cubes = toArray(doc?.DataSet?.Body?.Cube);
      for (const cube of cubes) {
        const date: string | undefined = cube?.["@_date"];
        if (!date) continue;
        const rateEntry = toArray(cube?.Rate).find(
          (r: Record<string, unknown>) => r["@_currency"] === code,
        );
        if (rateEntry) {
          allPoints.push({ date, rate: Number(rateEntry["#text"]) });
        }
      }
    }

    if (allPoints.length === 0) throw new Error("No history found for currency");

    allPoints.sort((a, b) => a.date.localeCompare(b.date));
    const trimmed = allPoints.slice(-days);
    return { points: trimmed, source: "live" };
  } catch {
    return { points: synthesizeHistory(code, days), source: "fallback" };
  }
}
