"use client";

import { useEffect, useState } from "react";
import type { HistoryPoint } from "@/lib/bnr";
import { CURRENCIES, currencyMeta } from "@/lib/currencies";
import HistoryChart from "./HistoryChart";
import DataSourceNotice from "./DataSourceNotice";

const RANGES = [
  { label: "30 zile", days: 30 },
  { label: "90 zile", days: 90 },
  { label: "180 zile", days: 180 },
  { label: "1 an", days: 365 },
];

interface HistoryResult {
  key: string;
  points: HistoryPoint[];
  source: "live" | "fallback";
}

export default function HistoryExplorer({ initialCurrency }: { initialCurrency: string }) {
  const [currency, setCurrency] = useState(initialCurrency);
  const [days, setDays] = useState(90);
  const [result, setResult] = useState<HistoryResult | null>(null);

  const key = `${currency}:${days}`;
  const loading = result?.key !== key;

  useEffect(() => {
    let cancelled = false;
    fetch(`/api/history?currency=${currency}&days=${days}`)
      .then((res) => res.json())
      .then((data: { points: HistoryPoint[]; source: "live" | "fallback" }) => {
        if (cancelled) return;
        setResult({ key: `${currency}:${days}`, points: data.points, source: data.source });
      });
    return () => {
      cancelled = true;
    };
  }, [currency, days]);

  const points = loading ? [] : result!.points;
  const source = result?.source ?? "live";
  const first = points[0];
  const last = points[points.length - 1];
  const change = first && last ? ((last.rate - first.rate) / first.rate) * 100 : 0;
  const meta = currencyMeta(currency);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            className="rounded-md border border-border bg-background px-3 py-2 text-sm font-semibold text-foreground focus:border-brand focus:outline-none"
          >
            {CURRENCIES.map((c) => (
              <option key={c.code} value={c.code}>
                {c.flag} {c.code} — {c.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex gap-1 rounded-md border border-border bg-background p-1">
          {RANGES.map((r) => (
            <button
              key={r.days}
              onClick={() => setDays(r.days)}
              className={`rounded px-3 py-1.5 text-sm font-medium transition-colors ${
                days === r.days
                  ? "bg-brand text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>
      </div>

      <DataSourceNotice source={source} className="mt-3" />

      <div className="mt-4 rounded-xl border border-border bg-surface p-4 sm:p-6">
        <div className="mb-2 flex items-baseline justify-between">
          <h2 className="text-lg font-bold text-foreground">
            {meta.flag} {currency} / RON
          </h2>
          {!loading && last && (
            <div className="text-right">
              <p className="font-mono text-xl font-bold text-foreground">
                {last.rate.toFixed(4)} RON
              </p>
              <p
                className={`text-sm font-semibold ${
                  change >= 0 ? "text-positive" : "text-negative"
                }`}
              >
                {change >= 0 ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%{" "}
                <span className="text-muted font-normal">pe perioada selectată</span>
              </p>
            </div>
          )}
        </div>
        {loading ? (
          <div className="flex h-[340px] items-center justify-center text-sm text-muted">
            Se încarcă istoricul…
          </div>
        ) : (
          <HistoryChart points={points} />
        )}
      </div>
    </div>
  );
}
