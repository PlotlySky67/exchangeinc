"use client";

import { useState } from "react";
import Link from "next/link";

interface BankRate {
  name: string;
  buy: number;
  sell: number;
}

// Real EUR/RON quotes published by each bank, sourced by the site owner.
const BANK_RATES: BankRate[] = [
  { name: "CEC Bank", buy: 5.2322, sell: 5.3238 },
  { name: "Libra Internet Bank", buy: 5.22, sell: 5.33 },
  { name: "Banca Transilvania", buy: 5.216, sell: 5.336 },
  { name: "Intesa Sanpaolo Bank", buy: 5.211, sell: 5.331 },
  { name: "UniCredit Bank", buy: 5.21, sell: 5.35 },
  { name: "Patria Bank", buy: 5.2065, sell: 5.352 },
  { name: "BRD", buy: 5.198, sell: 5.352 },
  { name: "Raiffeisen Bank", buy: 5.1798, sell: 5.3302 },
];

function initials(name: string): string {
  return name
    .split(" ")
    .filter((w) => w.length > 1)
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
}

type Mode = "buy" | "sell";

export default function BankRatesSection() {
  const [mode, setMode] = useState<Mode>("buy");

  const sorted = [...BANK_RATES].sort((a, b) =>
    mode === "buy" ? b.buy - a.buy : a.sell - b.sell,
  );
  const best = mode === "buy" ? sorted[0]?.buy : sorted[0]?.sell;

  return (
    <section className="mt-12 border-t border-border pt-10">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-foreground">
            Curs valutar bănci EUR/RON
          </h2>
          <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand">
            actualizat la data de 28 septembrie 2026
          </p>
        </div>
        <div className="flex shrink-0 rounded-full border border-border bg-background p-1">
          <button
            type="button"
            onClick={() => setMode("buy")}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              mode === "buy"
                ? "bg-brand text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            Cumpără
          </button>
          <button
            type="button"
            onClick={() => setMode("sell")}
            className={`rounded-full px-3.5 py-1.5 text-sm font-semibold transition-colors ${
              mode === "sell"
                ? "bg-brand text-white"
                : "text-muted hover:text-foreground"
            }`}
          >
            Vinde
          </button>
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Cursurile de cumpărare și vânzare EUR/RON afișate de principalele
        bănci din România, sortate după cursul{" "}
        {mode === "buy" ? "de cumpărare (cel mai avantajos primul)" : "de vânzare (cel mai avantajos primul)"}.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/40 text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold sm:px-5">Bancă</th>
              <th
                className={`px-4 py-3 text-right font-semibold sm:px-5 ${
                  mode === "buy" ? "text-brand" : ""
                }`}
              >
                Cumpără
              </th>
              <th
                className={`px-4 py-3 text-right font-semibold sm:px-5 ${
                  mode === "sell" ? "text-brand" : ""
                }`}
              >
                Vinde
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((bank) => {
              const value = mode === "buy" ? bank.buy : bank.sell;
              const isBest = value === best;
              return (
                <tr key={bank.name} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 sm:px-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand/10 text-xs font-bold text-brand">
                        {initials(bank.name)}
                      </span>
                      <span className="font-medium text-foreground">{bank.name}</span>
                      {isBest && (
                        <span className="rounded-full bg-positive/15 px-2 py-0.5 text-[10px] font-semibold text-positive">
                          cel mai bun
                        </span>
                      )}
                    </div>
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-mono sm:px-5 ${
                      mode === "buy"
                        ? "font-bold text-foreground"
                        : "font-semibold text-muted"
                    }`}
                  >
                    {bank.buy.toFixed(4)}
                  </td>
                  <td
                    className={`px-4 py-3 text-right font-mono sm:px-5 ${
                      mode === "sell"
                        ? "font-bold text-foreground"
                        : "font-semibold text-muted"
                    }`}
                  >
                    {bank.sell.toFixed(4)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">
        Cursurile pot varia; confirmă pe site-ul oficial al băncii înainte de
        a efectua o tranzacție. Vezi și{" "}
        <Link href="/termeni-si-conditii" className="text-brand hover:underline">
          termenii și condițiile
        </Link>
        .
      </p>
    </section>
  );
}
