// Live interbank/market FX cross-rates against RON, sourced from Frankfurter
// (https://frankfurter.dev), a free keyless API built on European Central
// Bank reference rates. Unlike a scrape of a third-party widget, this is a
// documented public API meant to be queried programmatically.
const FRANKFURTER_BASE = "https://api.frankfurter.dev/v1";
const SYMBOLS = ["USD", "GBP", "CHF", "RON"];
const REVALIDATE_SECONDS = 300;

const FETCH_HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
  Accept: "application/json",
};

export interface InterbankRow {
  pair: string;
  name: string;
  rate: number;
  delta: number;
  deltaPercent: number;
  date: string; // YYYY-MM-DD
}

// Used only if the live fetch fails — the last known real quotes, captured
// 18 September 2026, so the section degrades gracefully instead of breaking.
const FALLBACK_ROWS: InterbankRow[] = [
  { pair: "EUR/RON", name: "Euro", rate: 5.2642, delta: 0.0089, deltaPercent: 0.17, date: "2026-09-18" },
  { pair: "USD/RON", name: "Dolar american", rate: 4.5822, delta: 0.002, deltaPercent: 0.04, date: "2026-09-18" },
  { pair: "CHF/RON", name: "Franc elvețian", rate: 5.5738, delta: 0.0136, deltaPercent: 0.24, date: "2026-09-18" },
  { pair: "GBP/RON", name: "Liră sterlină", rate: 6.1387, delta: 0.0218, deltaPercent: 0.36, date: "2026-09-18" },
];

function formatDate(d: Date): string {
  return d.toISOString().slice(0, 10);
}

async function fetchFrankfurterRange(
  days: number,
): Promise<Record<string, Record<string, number>> | null> {
  const end = new Date();
  const start = new Date();
  start.setDate(start.getDate() - days);

  try {
    const res = await fetch(
      `${FRANKFURTER_BASE}/${formatDate(start)}..${formatDate(end)}?base=EUR&symbols=${SYMBOLS.join(",")}`,
      {
        headers: FETCH_HEADERS,
        next: { revalidate: REVALIDATE_SECONDS, tags: ["interbank-rates"] },
      },
    );
    if (!res.ok) throw new Error(`Frankfurter responded ${res.status}`);
    const data = await res.json();
    const rates = data?.rates as Record<string, Record<string, number>> | undefined;
    if (!rates || Object.keys(rates).length === 0) throw new Error("Empty Frankfurter response");
    return rates;
  } catch (err) {
    console.error("[interbank] fetch failed:", err);
    return null;
  }
}

function crossRates(eurRates: Record<string, number>) {
  return {
    eurRon: eurRates.RON,
    usdRon: eurRates.RON / eurRates.USD,
    gbpRon: eurRates.RON / eurRates.GBP,
    chfRon: eurRates.RON / eurRates.CHF,
  };
}

function buildRow(
  pair: string,
  name: string,
  rate: number,
  prevRate: number,
  date: string,
): InterbankRow {
  const delta = rate - prevRate;
  const deltaPercent = prevRate !== 0 ? (delta / prevRate) * 100 : 0;
  return { pair, name, rate, delta, deltaPercent, date };
}

export async function getInterbankRates(): Promise<{
  rows: InterbankRow[];
  source: "live" | "fallback";
}> {
  const ratesByDate = await fetchFrankfurterRange(8);
  if (!ratesByDate) return { rows: FALLBACK_ROWS, source: "fallback" };

  const dates = Object.keys(ratesByDate).sort();
  if (dates.length === 0) return { rows: FALLBACK_ROWS, source: "fallback" };

  const latestDate = dates[dates.length - 1];
  const prevDate = dates.length > 1 ? dates[dates.length - 2] : latestDate;

  const latest = crossRates(ratesByDate[latestDate]);
  const previous = crossRates(ratesByDate[prevDate]);

  return {
    rows: [
      buildRow("EUR/RON", "Euro", latest.eurRon, previous.eurRon, latestDate),
      buildRow("USD/RON", "Dolar american", latest.usdRon, previous.usdRon, latestDate),
      buildRow("CHF/RON", "Franc elvețian", latest.chfRon, previous.chfRon, latestDate),
      buildRow("GBP/RON", "Liră sterlină", latest.gbpRon, previous.gbpRon, latestDate),
    ],
    source: "live",
  };
}
