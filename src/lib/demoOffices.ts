import type { RateEntry } from "./bnr";

export interface OfficeQuote {
  office: string;
  city: string;
  buy: number;
  sell: number;
}

// Sample/demo data illustrating the "compare exchange offices" layout.
// These are fictional entries with rates derived from the BNR reference
// rate plus a synthetic spread — NOT live quotes from real businesses.
// Wire up a real exchange-office data feed to replace this.
const DEMO_OFFICES = [
  { office: "Casa de Schimb Centrala", city: "București", spreadBuy: 0.006, spreadSell: 0.009 },
  { office: "Exchange Point Nord", city: "Cluj-Napoca", spreadBuy: 0.004, spreadSell: 0.011 },
  { office: "Valuta Expres", city: "Timișoara", spreadBuy: 0.007, spreadSell: 0.008 },
  { office: "Schimb Valutar Sud", city: "Craiova", spreadBuy: 0.005, spreadSell: 0.01 },
  { office: "FastCurrency", city: "Iași", spreadBuy: 0.003, spreadSell: 0.012 },
];

export function demoOfficeQuotes(rate: RateEntry): OfficeQuote[] {
  const unit = rate.rate / rate.multiplier;
  return DEMO_OFFICES.map((o) => ({
    office: o.office,
    city: o.city,
    buy: Number((unit * (1 - o.spreadBuy)).toFixed(4)),
    sell: Number((unit * (1 + o.spreadSell)).toFixed(4)),
  }));
}

export interface JudetOfficeQuote {
  office: string;
  eurBuy: number;
  eurSell: number;
  usdBuy: number;
  usdSell: number;
}

// Fictional office name templates used to generate a per-județ comparison
// table. Combined with a deterministic seed (județ + template), this always
// produces the same sample numbers for a given county — stable across
// renders/deploys — without hand-authoring 42 counties x N offices by hand.
const OFFICE_NAME_TEMPLATES = [
  "Exchange Central",
  "Casa de Schimb Nord",
  "Valuta Expres",
  "Schimb Rapid",
];

function seededRandom(seed: string): () => number {
  let h = 0;
  for (let i = 0; i < seed.length; i++) {
    h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return () => {
    h = (h * 1103515245 + 12345) >>> 0;
    return (h % 10000) / 10000;
  };
}

export function judetOfficeQuotes(
  judetSlug: string,
  eur: RateEntry,
  usd: RateEntry,
): JudetOfficeQuote[] {
  const eurUnit = eur.rate / eur.multiplier;
  const usdUnit = usd.rate / usd.multiplier;

  return OFFICE_NAME_TEMPLATES.map((office) => {
    const rand = seededRandom(`${judetSlug}:${office}`);
    const eurBuySpread = 0.003 + rand() * 0.006;
    const eurSellSpread = 0.004 + rand() * 0.008;
    const usdBuySpread = 0.003 + rand() * 0.006;
    const usdSellSpread = 0.004 + rand() * 0.008;
    return {
      office,
      eurBuy: Number((eurUnit * (1 - eurBuySpread)).toFixed(4)),
      eurSell: Number((eurUnit * (1 + eurSellSpread)).toFixed(4)),
      usdBuy: Number((usdUnit * (1 - usdBuySpread)).toFixed(4)),
      usdSell: Number((usdUnit * (1 + usdSellSpread)).toFixed(4)),
    };
  });
}
