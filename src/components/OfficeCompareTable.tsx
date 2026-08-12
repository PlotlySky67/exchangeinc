import type { OfficeQuote } from "@/lib/demoOffices";

export default function OfficeCompareTable({
  quotes,
  currency,
}: {
  quotes: OfficeQuote[];
  currency: string;
}) {
  const best = quotes.reduce((a, b) => (b.buy > a.buy ? b : a), quotes[0]);
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-background/60 text-left text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-3 font-semibold">Casă de schimb</th>
            <th className="px-4 py-3 font-semibold">Oraș</th>
            <th className="px-4 py-3 font-semibold text-right">Cumpără</th>
            <th className="px-4 py-3 font-semibold text-right">Vinde</th>
          </tr>
        </thead>
        <tbody>
          {quotes.map((q) => (
            <tr
              key={q.office}
              className={`border-b border-border last:border-0 ${
                q.office === best.office ? "bg-positive/5" : ""
              }`}
            >
              <td className="px-4 py-3 font-medium text-foreground">
                {q.office}
                {q.office === best.office && (
                  <span className="ml-2 rounded-full bg-positive/15 px-2 py-0.5 text-xs font-semibold text-positive">
                    cel mai bun curs
                  </span>
                )}
              </td>
              <td className="px-4 py-3 text-muted">{q.city}</td>
              <td className="px-4 py-3 text-right font-mono text-foreground">
                {q.buy.toFixed(4)}
              </td>
              <td className="px-4 py-3 text-right font-mono text-foreground">
                {q.sell.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="border-t border-border bg-background/60 px-4 py-2 text-xs text-muted">
        Date demonstrative pentru {currency}, calculate ca marjă sintetică
        față de cursul BNR — nu sunt cotații live de la case de schimb reale.
      </p>
    </div>
  );
}
