"use client";

import { useEffect, useState } from "react";
import type { RateEntry, RatesSnapshot } from "@/lib/bnr";

function formatDate(date: Date): string {
  const dd = String(date.getDate()).padStart(2, "0");
  const mm = String(date.getMonth() + 1).padStart(2, "0");
  return `${dd}.${mm}.${date.getFullYear()}`;
}

export default function QuickConverter({
  initialSnapshot,
}: {
  initialSnapshot?: RatesSnapshot;
}) {
  const [snapshot, setSnapshot] = useState<RatesSnapshot | undefined>(initialSnapshot);
  const [loading, setLoading] = useState(!initialSnapshot);
  const [amount, setAmount] = useState("1");
  const [from, setFrom] = useState("EUR");
  const [to, setTo] = useState("RON");

  useEffect(() => {
    if (initialSnapshot) return;
    let cancelled = false;
    fetch("/api/rates")
      .then((res) => res.json())
      .then((data: RatesSnapshot) => {
        if (!cancelled) setSnapshot(data);
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [initialSnapshot]);

  const options = ["RON", "EUR"];

  function unitRate(code: string): number {
    if (code === "RON") return 1;
    const entry = snapshot?.rates.find((r: RateEntry) => r.currency === code);
    return entry ? entry.rate / entry.multiplier : NaN;
  }

  const numericAmount = Number(amount.replace(",", "."));
  const result =
    Number.isFinite(numericAmount) && snapshot
      ? (numericAmount * unitRate(from)) / unitRate(to)
      : NaN;

  function swap() {
    setFrom(to);
    setTo(from);
  }

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-sm font-semibold text-foreground">
        Convertor Valutar BNR actualizat la data de ({formatDate(new Date())})
      </p>
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <input
          type="text"
          inputMode="decimal"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-20 rounded-md border border-border bg-background px-3 py-2 text-right text-base font-semibold text-foreground focus:border-brand focus:outline-none"
        />
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="rounded-md border border-border bg-background px-2 py-2 text-sm font-medium text-foreground focus:border-brand focus:outline-none"
        >
          {options.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <span className="text-base font-semibold text-muted">=</span>
        <div className="min-w-24 flex-1 rounded-md border border-border bg-background px-3 py-2 text-right text-base font-semibold text-foreground sm:flex-none">
          {loading
            ? "…"
            : Number.isFinite(result)
              ? result.toLocaleString("ro-RO", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })
              : "—"}
        </div>
        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="rounded-md border border-border bg-background px-2 py-2 text-sm font-medium text-foreground focus:border-brand focus:outline-none"
        >
          {options.map((code) => (
            <option key={code} value={code}>
              {code}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={swap}
          aria-label="Inversează valutele"
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-accent text-white transition-colors hover:opacity-90"
        >
          ⇄
        </button>
      </div>
      <p className="mt-3 text-xs text-muted">Sursă: cursbnr.ro</p>
    </div>
  );
}
