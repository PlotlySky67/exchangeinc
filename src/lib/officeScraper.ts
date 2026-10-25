import * as cheerio from "cheerio";
import { OFFICE_SOURCES } from "./officeSources";

// Same reasoning as BNR_FETCH_HEADERS in src/lib/bnr.ts: look like a real
// browser navigation, since source sites may run anti-bot protection.
const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
  "Accept-Language": "ro-RO,ro;q=0.9,en-US;q=0.8,en;q=0.7",
};

const TRACKED_CURRENCIES = ["EUR", "USD", "GBP", "CHF"] as const;

export interface ScrapedRate {
  currency: string;
  buy: number;
  sell: number;
}

export interface ScrapedOffice {
  officeName: string;
  url: string;
  fetchedAt: string; // ISO timestamp of this fetch attempt
  ok: boolean;
  error?: string;
  status?: number;
  // Time the SOURCE page itself claims the quote was captured (e.g.
  // "15:02"), parsed from the page text — not when we fetched it.
  sourceTime?: string;
  rates: ScrapedRate[];
  // First ~2000 chars of extracted page text, kept so the staging page can
  // show what the parser actually saw — the regex below is a best-effort
  // guess at valutare.ro's layout, never verified against real HTML from
  // inside this environment, so this is the manual-review safety net.
  textSnippet: string;
}

// Matches a pattern consistently seen in screenshots of valutare.ro office
// pages: "EUR - Euro   5.3250 ↑  5.3490 ↑  15:02". Deliberately loose:
// currency code, a dash, a non-numeric currency name, two decimals
// (buy/sell), optional trend arrows, and a HH:MM time.
const RATE_LINE_RE =
  /(EUR|USD|GBP|CHF)\s*-\s*[^\d\n]{2,40}?(\d+(?:\.\d+)?)\s*[↑↓=]?\s*(\d+(?:\.\d+)?)\s*[↑↓=]?\s*(\d{1,2}:\d{2})/g;

function parseRatesFromText(text: string): {
  rates: ScrapedRate[];
  sourceTime?: string;
} {
  const normalized = text.replace(/\s+/g, " ");
  const seen = new Set<string>();
  const rates: ScrapedRate[] = [];
  let sourceTime: string | undefined;

  for (const match of normalized.matchAll(RATE_LINE_RE)) {
    const [, currency, buyStr, sellStr, time] = match;
    // Keep only the first match per currency — bulk/minimum-amount rows
    // (e.g. "minim 10000€") repeat the same currency further down the
    // page, and every screenshot seen so far has the normal retail row
    // first.
    if (seen.has(currency)) continue;
    if (!TRACKED_CURRENCIES.includes(currency as (typeof TRACKED_CURRENCIES)[number])) continue;
    seen.add(currency);
    rates.push({ currency, buy: Number(buyStr), sell: Number(sellStr) });
    sourceTime ??= time;
  }

  return { rates, sourceTime };
}

async function scrapeOne(officeName: string, url: string): Promise<ScrapedOffice> {
  const fetchedAt = new Date().toISOString();
  try {
    const res = await fetch(url, {
      headers: FETCH_HEADERS,
      // Cached for 15 minutes so repeated staging-page loads between cron
      // runs don't keep re-fetching the source site.
      next: { revalidate: 900, tags: ["office-scrape"] },
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    const text = $("body").text();
    const { rates, sourceTime } = parseRatesFromText(text);

    return {
      officeName,
      url,
      fetchedAt,
      ok: res.ok && rates.length > 0,
      status: res.status,
      error: !res.ok
        ? `HTTP ${res.status}`
        : rates.length === 0
          ? "Niciun curs recunoscut în pagină — selectorul de parsare trebuie ajustat"
          : undefined,
      sourceTime,
      rates,
      textSnippet: text.replace(/\s+/g, " ").trim().slice(0, 2000),
    };
  } catch (err) {
    return {
      officeName,
      url,
      fetchedAt,
      ok: false,
      error: err instanceof Error ? err.message : String(err),
      rates: [],
      textSnippet: "",
    };
  }
}

export async function scrapeAllOfficeSources(): Promise<ScrapedOffice[]> {
  return Promise.all(OFFICE_SOURCES.map((s) => scrapeOne(s.officeName, s.url)));
}
