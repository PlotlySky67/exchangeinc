"use client";

import { useEffect, useMemo, useState } from "react";
import type { RateEntry, RatesSnapshot } from "@/lib/bnr";
import { currencyMeta } from "@/lib/currencies";

const RON = { code: "RON", name: "Leu românesc", flag: "🇷🇴" };

export default function ConverterWidget({
  initialSnapshot,
  compact = false,
}: {
  initialSnapshot?: RatesSnapshot;
  compact?: boolean;
}) {
  const [snapshot, setSnapshot] = useState<RatesSnapshot | undefined>(initialSnapshot);
  const [loading, setLoading] = useState(!initialSnapshot);
  const [amount, setAmount] = useState("100");
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

  const options = useMemo(() => {
    const codes = (snapshot?.rates ?? []).map((r) => r.currency);
    return ["RON", ...codes];
  }, [snapshot]);

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

  function metaFor(code: string) {
    return code === "RON" ? RON : currencyMeta(code);
  }

  return (
    <div
      className={`rounded-xl border border-border bg-surface p-5 shadow-sm ${
        compact ? "" : "sm:p-6"
      }`}
    >
      <div className="grid gap-3 sm:grid-cols-[1fr_auto_1fr] sm:items-end">
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-muted">Sumă</span>
          <input
            type="text"
            inputMode="decimal"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-lg font-semibold text-foreground focus:border-brand focus:outline-none"
          />
        </label>

        <div className="flex items-end justify-center gap-2 sm:pb-1">
          <select
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className="rounded-md border border-border bg-background px-2 py-2 text-sm font-medium text-foreground focus:border-brand focus:outline-none"
          >
            {options.map((code) => (
              <option key={code} value={code}>
                {metaFor(code).flag} {code}
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={swap}
            aria-label="Inversează valutele"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background text-muted hover:bg-border hover:text-foreground"
          >
            ⇄
          </button>
          <select
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className="rounded-md border border-border bg-background px-2 py-2 text-sm font-medium text-foreground focus:border-brand focus:outline-none"
          >
            {options.map((code) => (
              <option key={code} value={code}>
                {metaFor(code).flag} {code}
              </option>
            ))}
          </select>
        </div>

        <div>
          <span className="mb-1 block text-xs font-medium text-muted">Rezultat</span>
          <div className="w-full truncate rounded-md border border-brand/30 bg-brand/5 px-3 py-2 text-lg font-bold text-brand">
            {loading
              ? "Se încarcă…"
              : Number.isFinite(result)
                ? result.toLocaleString("ro-RO", { maximumFractionDigits: 4 })
                : "—"}{" "}
            {to}
          </div>
        </div>
      </div>

      {!loading && snapshot && (
        <p className="mt-3 text-xs text-muted">
          1 {from} ={" "}
          {(unitRate(from) / unitRate(to)).toLocaleString("ro-RO", {
            maximumFractionDigits: 4,
          })}{" "}
          {to} · curs din {snapshot.date}
          {snapshot.source === "fallback" ? " (date de rezervă)" : " (BNR)"}
        </p>
      )}
    </div>
  );
}
