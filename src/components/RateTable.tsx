import Link from "next/link";
import type { RateEntry } from "@/lib/bnr";
import { currencyMeta } from "@/lib/currencies";

export default function RateTable({ rates }: { rates: RateEntry[] }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-background/60 text-left text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-3 font-semibold">Valută</th>
            <th className="px-4 py-3 font-semibold text-right">Unitate</th>
            <th className="px-4 py-3 font-semibold text-right">Curs BNR (RON)</th>
            <th className="px-4 py-3 font-semibold text-right sm:table-cell hidden">
              Detalii
            </th>
          </tr>
        </thead>
        <tbody>
          {rates.map((r) => {
            const meta = currencyMeta(r.currency);
            return (
              <tr
                key={r.currency}
                className="border-b border-border last:border-0 hover:bg-background/50"
              >
                <td className="px-4 py-3">
                  <span className="mr-2">{meta.flag}</span>
                  <span className="font-semibold text-foreground">{r.currency}</span>
                  <span className="ml-2 text-muted hidden sm:inline">{meta.name}</span>
                </td>
                <td className="px-4 py-3 text-right text-muted">{r.multiplier}</td>
                <td className="px-4 py-3 text-right font-mono font-semibold text-foreground">
                  {(r.rate / r.multiplier).toFixed(4)}
                </td>
                <td className="px-4 py-3 text-right hidden sm:table-cell">
                  <Link
                    href={`/istoric?valuta=${r.currency}`}
                    className="text-brand hover:underline"
                  >
                    Istoric →
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
