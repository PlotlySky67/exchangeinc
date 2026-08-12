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
