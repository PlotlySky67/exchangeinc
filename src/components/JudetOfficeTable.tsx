import type { JudetOfficeQuote } from "@/lib/demoOffices";

export default function JudetOfficeTable({
  quotes,
  judetName,
}: {
  quotes: JudetOfficeQuote[];
  judetName: string;
}) {
  const bestEur = quotes.reduce((a, b) => (b.eurBuy > a.eurBuy ? b : a), quotes[0]);

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/60 text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold">Casă de schimb</th>
              <th className="px-4 py-3 font-semibold text-right">EUR cumpără</th>
              <th className="px-4 py-3 font-semibold text-right">EUR vinde</th>
              <th className="px-4 py-3 font-semibold text-right">USD cumpără</th>
              <th className="px-4 py-3 font-semibold text-right">USD vinde</th>
            </tr>
          </thead>
          <tbody>
            {quotes.map((q) => (
              <tr
                key={q.office}
                className={`border-b border-border last:border-0 ${
                  q.office === bestEur.office ? "bg-positive/5" : ""
                }`}
              >
                <td className="px-4 py-3 font-medium text-foreground whitespace-nowrap">
                  {q.office}
                  {q.office === bestEur.office && (
                    <span className="ml-2 rounded-full bg-positive/15 px-2 py-0.5 text-xs font-semibold text-positive">
                      cel mai bun curs EUR
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-right font-mono text-foreground">
                  {q.eurBuy.toFixed(4)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-foreground">
                  {q.eurSell.toFixed(4)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-foreground">
                  {q.usdBuy.toFixed(4)}
                </td>
                <td className="px-4 py-3 text-right font-mono text-foreground">
                  {q.usdSell.toFixed(4)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="border-t border-border bg-background/60 px-4 py-2 text-xs text-muted">
        Date demonstrative pentru județul {judetName}, calculate ca marjă
        sintetică față de cursul BNR — nu sunt cotații live de la case de
        schimb reale.
      </p>
    </div>
  );
}
