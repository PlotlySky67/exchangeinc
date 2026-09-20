import type { RateEntry } from "@/lib/bnr";
import type { RealOffice } from "@/lib/realOffices";

interface Row {
  name: string;
  city: string;
  buy: number;
  sell: number;
}

export default function OfficeComparisonTable({
  currency,
  currencyName,
  offices,
  bnrRates,
}: {
  currency: string;
  currencyName: string;
  offices: RealOffice[];
  bnrRates: RateEntry[];
}) {
  const bnrEntry = bnrRates.find((r) => r.currency === currency);
  const bnrUnit = bnrEntry ? bnrEntry.rate / bnrEntry.multiplier : 0;

  const rows: Row[] = offices
    .map((office) => {
      const rate = office.rates.find((r) => r.currency === currency);
      if (!rate) return null;
      return {
        name: office.name,
        city: office.city,
        buy: bnrUnit * rate.buyFactor,
        sell: bnrUnit * rate.sellFactor,
      };
    })
    .filter((r): r is Row => r !== null)
    .sort((a, b) => b.buy - a.buy);

  if (rows.length === 0) return null;

  const bestBuy = Math.max(...rows.map((r) => r.buy));
  const bestSell = Math.min(...rows.map((r) => r.sell));

  return (
    <div>
      <h2 className="text-lg font-bold text-foreground">
        {currency} · {currencyName}
      </h2>
      <div className="mt-3 overflow-hidden rounded-xl border border-border bg-surface">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-background/60 text-left text-xs uppercase tracking-wide text-muted">
              <th className="px-4 py-3 font-semibold sm:px-5">Casă de schimb</th>
              <th className="px-4 py-3 font-semibold sm:px-5">Oraș</th>
              <th className="px-4 py-3 text-right font-semibold sm:px-5">Cumpără</th>
              <th className="px-4 py-3 text-right font-semibold sm:px-5">Vinde</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr
                key={`${row.name}-${row.city}`}
                className="border-b border-border last:border-0"
              >
                <td className="px-4 py-3 font-medium text-foreground sm:px-5">{row.name}</td>
                <td className="px-4 py-3 text-muted sm:px-5">{row.city}</td>
                <td
                  className={`px-4 py-3 text-right font-mono font-semibold sm:px-5 ${
                    row.buy === bestBuy ? "text-positive" : "text-foreground"
                  }`}
                >
                  {row.buy.toFixed(4)}
                  {row.buy === bestBuy && (
                    <span className="ml-2 rounded-full bg-positive/15 px-2 py-0.5 text-[10px] font-semibold text-positive">
                      cel mai bun
                    </span>
                  )}
                </td>
                <td
                  className={`px-4 py-3 text-right font-mono font-semibold sm:px-5 ${
                    row.sell === bestSell ? "text-positive" : "text-foreground"
                  }`}
                >
                  {row.sell.toFixed(4)}
                  {row.sell === bestSell && (
                    <span className="ml-2 rounded-full bg-positive/15 px-2 py-0.5 text-[10px] font-semibold text-positive">
                      cel mai bun
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
