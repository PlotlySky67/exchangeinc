interface InterbankRow {
  pair: string;
  name: string;
  rate: number;
  delta: number;
  deltaPercent: number;
  capturedLabel: string;
}

const ROWS: InterbankRow[] = [
  {
    pair: "EUR/RON",
    name: "Euro",
    rate: 5.2642,
    delta: 0.0089,
    deltaPercent: 0.17,
    capturedLabel: "18/09",
  },
  {
    pair: "USD/RON",
    name: "Dolar american",
    rate: 4.5822,
    delta: 0.002,
    deltaPercent: 0.04,
    capturedLabel: "18/09",
  },
  {
    pair: "CHF/RON",
    name: "Franc elvețian",
    rate: 5.5738,
    delta: 0.0136,
    deltaPercent: 0.24,
    capturedLabel: "18/09",
  },
  {
    pair: "GBP/RON",
    name: "Liră sterlină",
    rate: 6.1374,
    delta: 0.0192,
    deltaPercent: 0.31,
    capturedLabel: "18/09",
  },
];

function formatDelta(delta: number): string {
  const sign = delta >= 0 ? "+" : "";
  return `${sign}${delta.toFixed(4)}`;
}

function formatPercent(percent: number): string {
  const sign = percent >= 0 ? "+" : "";
  return `(${sign}${percent.toFixed(2)}%)`;
}

export default function InterbankRatesSnapshot() {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="border-b border-border bg-background/60 px-4 py-3 sm:px-5">
        <p className="text-sm text-muted">
          Cotații valutare în timp real pentru euro (EUR/RON), dolarul
          american (USD/RON), francul elvețian (CHF/RON) și lira sterlină
          (GBP/RON).
        </p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-background/40 text-left text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-2 font-semibold sm:px-5">Pereche</th>
            <th className="px-4 py-2 text-right font-semibold sm:px-5">Curs</th>
            <th className="px-4 py-2 text-right font-semibold sm:px-5">Variație</th>
          </tr>
        </thead>
        <tbody>
          {ROWS.map((row) => {
            const up = row.delta >= 0;
            return (
              <tr key={row.pair} className="border-b border-border last:border-0">
                <td className="px-4 py-3 sm:px-5">
                  <span className="font-semibold text-foreground">{row.pair}</span>
                  <span className="ml-2 text-muted">{row.name}</span>
                  <span className="ml-2 text-xs text-muted">· {row.capturedLabel}</span>
                </td>
                <td className="px-4 py-3 text-right font-mono font-semibold text-foreground sm:px-5">
                  {row.rate.toFixed(4)}
                </td>
                <td
                  className={`px-4 py-3 text-right font-mono font-bold sm:px-5 ${
                    up ? "text-positive" : "text-negative"
                  }`}
                >
                  {formatDelta(row.delta)} {formatPercent(row.deltaPercent)} {up ? "↑" : "↓"}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
