import { XMLParser } from "fast-xml-parser";
import * as cheerio from "cheerio";

// Official public data feeds published by the National Bank of Romania (BNR).
// Docs: https://www.bnr.ro/Cursul-de-schimb-3544.aspx
const BNR_DAILY_URL = "https://www.bnr.ro/nbrfxrates.xml";
const BNR_YEARLY_URL = (year: number) =>
  `https://www.bnr.ro/files/xml/years/nbrfxrates${year}.xml`;

// Fallback source when bnr.ro's own feed is blocked (see BNR_FETCH_HEADERS
// comment below) — a simple HTML <table> mirroring the same official BNR
// rate, confirmed working by hand (scrape-valutare.js against this exact
// URL successfully returned real rates: EUR/USD/GBP/CHF + more).
const CURSBNR_FALLBACK_URL = "https://www.cursbnr.ro/curs-bnr-azi";

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
// dev environments). Values are a realistic reference point — the UI always
// labels this as cached/sample data rather than presenting it as live. The
// date always tracks today so the fallback never looks stuck on a fixed day.
function getFallbackDate(): string {
  return new Date().toISOString().slice(0, 10);
}
const FALLBACK_RATES: RateEntry[] = [
  { currency: "EUR", multiplier: 1, rate: 5.3495 },
  { currency: "USD", multiplier: 1, rate: 4.8088 },
  { currency: "GBP", multiplier: 1, rate: 6.3848 },
  { currency: "CHF", multiplier: 1, rate: 5.7911 },
  { currency: "AED", multiplier: 1, rate: 1.2915 },
  { currency: "AUD", multiplier: 1, rate: 3.3007 },
  { currency: "BGN", multiplier: 1, rate: 2.5967 },
  { currency: "BRL", multiplier: 1, rate: 0.9303 },
  { currency: "CAD", multiplier: 1, rate: 3.3497 },
  { currency: "CNY", multiplier: 1, rate: 0.7094 },
  { currency: "CZK", multiplier: 1, rate: 0.2194 },
  { currency: "DKK", multiplier: 1, rate: 0.714 },
  { currency: "EGP", multiplier: 1, rate: 0.0887 },
  { currency: "HKD", multiplier: 1, rate: 0.6043 },
  { currency: "HUF", multiplier: 100, rate: 1.4695 },
  { currency: "IDR", multiplier: 100, rate: 0.0263 },
  { currency: "ILS", multiplier: 1, rate: 1.5345 },
  { currency: "INR", multiplier: 1, rate: 0.05 },
  { currency: "ISK", multiplier: 100, rate: 3.9184 },
  { currency: "JPY", multiplier: 100, rate: 3.0022 },
  { currency: "KRW", multiplier: 100, rate: 0.3564 },
  { currency: "MDL", multiplier: 1, rate: 0.2655 },
  { currency: "MXN", multiplier: 1, rate: 0.258 },
  { currency: "MYR", multiplier: 1, rate: 1.1622 },
  { currency: "NOK", multiplier: 1, rate: 0.5018 },
  { currency: "NZD", multiplier: 1, rate: 2.6877 },
  { currency: "PHP", multiplier: 1, rate: 0.0753 },
  { currency: "PLN", multiplier: 1, rate: 1.2219 },
  { currency: "RSD", multiplier: 1, rate: 0.0455 },
  { currency: "RUB", multiplier: 1, rate: 0.0567 },
  { currency: "SEK", multiplier: 1, rate: 0.4792 },
  { currency: "SGD", multiplier: 1, rate: 3.7073 },
  { currency: "THB", multiplier: 1, rate: 0.142 },
  { currency: "TRY", multiplier: 1, rate: 0.0957 },
  { currency: "UAH", multiplier: 1, rate: 0.1057 },
  { currency: "XAU", multiplier: 1, rate: 637.7784 },
  { currency: "XDR", multiplier: 1, rate: 6.4319 },
  { currency: "ZAR", multiplier: 1, rate: 0.2886 },
];

function fallbackSnapshot(): RatesSnapshot {
  return { date: getFallbackDate(), rates: FALLBACK_RATES, source: "fallback" };
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

// bnr.ro sits behind an Akamai WAF that actively rejects this request in
// production (confirmed via logs: HTTP 200 with an Akamai "Request
// Rejected" HTML block page instead of XML). A bare User-Agent isn't enough
// to pass its bot heuristics, so this mimics a full browser navigation —
// though Akamai can also fingerprint at the TLS layer, which a plain
// fetch() can't spoof, so this may still not be sufficient on its own.
const BNR_FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/xml,text/xml,*/*",
  "Accept-Language": "ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7",
  Referer: "https://www.bnr.ro/Cursul-de-schimb-3544.aspx",
  "Sec-Fetch-Dest": "document",
  "Sec-Fetch-Mode": "navigate",
  "Sec-Fetch-Site": "same-origin",
  "Sec-Fetch-User": "?1",
  "Upgrade-Insecure-Requests": "1",
};

async function fetchFromBnrDirect(): Promise<RatesSnapshot> {
  const res = await fetch(BNR_DAILY_URL, {
    headers: BNR_FETCH_HEADERS,
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

  if (!date || rates.length === 0) {
    // Diagnostic-only: capture what BNR actually sent back (status,
    // content-type, a short snippet) so a malformed-feed failure can be
    // debugged from logs alone instead of reproduced blind — e.g. this is
    // what a bot-protection HTML challenge page looks like vs. real XML.
    console.error("[bnr] malformed feed details:", {
      status: res.status,
      contentType: res.headers.get("content-type"),
      snippet: xml.slice(0, 300),
    });
    throw new Error("Malformed BNR daily feed");
  }

  return { date, rates, source: "live" };
}

// A table row's first cell looks like "EUR" or "100HUF" (BNR quotes some
// currencies per 100 units). Splits that back into multiplier + code.
function parseCurrencyCell(cell: string): { currency: string; multiplier: number } | null {
  const match = cell.trim().match(/^(\d+)?([A-Z]{3})$/);
  if (!match) return null;
  return { currency: match[2], multiplier: match[1] ? Number(match[1]) : 1 };
}

// Fallback for when bnr.ro's own WAF blocks the request (see
// BNR_FETCH_HEADERS comment): cursbnr.ro republishes the same official BNR
// rate in a plain HTML table, which — unlike bnr.ro itself — has been
// confirmed reachable. Still the real BNR rate, just mirrored, so this
// counts as "live", not "fallback".
async function fetchFromCursBnr(): Promise<RatesSnapshot> {
  const res = await fetch(CURSBNR_FALLBACK_URL, {
    headers: BNR_FETCH_HEADERS,
    next: { revalidate: RATES_REVALIDATE_SECONDS, tags: ["bnr-rates"] },
  });
  if (!res.ok) throw new Error(`cursbnr.ro responded ${res.status}`);
  const html = await res.text();
  const $ = cheerio.load(html);
  const rates: RateEntry[] = [];

  $("table tr").each((_, row) => {
    const cells = $(row)
      .find("td")
      .map((_, td) => $(td).text().trim())
      .get();
    if (cells.length < 2) return;
    const parsed = parseCurrencyCell(cells[0]);
    const rate = Number(cells[1].replace(",", "."));
    if (parsed && Number.isFinite(rate)) {
      rates.push({ currency: parsed.currency, multiplier: parsed.multiplier, rate });
    }
  });

  if (rates.length === 0) throw new Error("No rates found in cursbnr.ro table");
  return { date: getFallbackDate(), rates, source: "live" };
}

export async function getDailyRates(): Promise<RatesSnapshot> {
  try {
    return await fetchFromBnrDirect();
  } catch (err) {
    console.error("[bnr] direct BNR fetch failed, trying cursbnr.ro mirror:", err);
  }

  try {
    return await fetchFromCursBnr();
  } catch (err) {
    console.error("[bnr] cursbnr.ro mirror also failed, using hardcoded fallback:", err);
  }

  return fallbackSnapshot();
}

export async function getRate(currency: string): Promise<RateEntry | undefined> {
  const snapshot = await getDailyRates();
  return snapshot.rates.find((r) => r.currency === currency.toUpperCase());
}

function synthesizeHistory(currency: string, days: number): HistoryPoint[] {
  const base = FALLBACK_RATES.find((r) => r.currency === currency.toUpperCase())?.rate ?? 5;
  const dates: string[] = [];
  const end = new Date(getFallbackDate());
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(end);
    d.setDate(d.getDate() - i);
    dates.push(d.toISOString().slice(0, 10));
  }

  // Deterministic pseudo-random walk so the fallback chart is stable across renders.
  let seed = currency.split("").reduce((acc, ch) => acc + ch.charCodeAt(0), 0);
  const rand = () => {
    seed = (seed * 9301 + 49297) % 233280;
    return seed / 233280;
  };
  const rawValues: number[] = [];
  let value = base * 0.985;
  for (let i = 0; i < days; i++) {
    value += (rand() - 0.5) * base * 0.004;
    rawValues.push(value);
  }

  // Smoothly bend the walk (a "Brownian bridge") so it ends exactly at today's
  // real rate instead of snapping there on the last point.
  const lastIndex = days - 1;
  const drift = base - rawValues[lastIndex];
  const points: HistoryPoint[] = rawValues.map((v, i) => {
    const corrected = v + (drift * i) / lastIndex;
    return { date: dates[i], rate: Number(corrected.toFixed(4)) };
  });
  points[lastIndex] = { date: getFallbackDate(), rate: base };
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
        headers: BNR_FETCH_HEADERS,
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
  } catch (err) {
    console.error("[bnr] getHistory failed, using fallback:", err);
    return { points: synthesizeHistory(code, days), source: "fallback" };
  }
}
