import type { RealOffice } from "@/lib/realOffices";

export default function RealOfficeTable({ office }: { office: RealOffice }) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="border-b border-border bg-background/60 px-4 py-3 sm:px-5">
        <p className="text-sm font-bold text-foreground">{office.name}</p>
        <p className="text-xs text-muted">{office.city}</p>
      </div>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border bg-background/40 text-left text-xs uppercase tracking-wide text-muted">
            <th className="px-4 py-2 font-semibold sm:px-5">Valută</th>
            <th className="px-4 py-2 text-right font-semibold sm:px-5">Cumpără</th>
            <th className="px-4 py-2 text-right font-semibold sm:px-5">Vinde</th>
          </tr>
        </thead>
        <tbody>
          {office.rates.map((r) => (
            <tr key={r.currency} className="border-b border-border last:border-0">
              <td className="px-4 py-3 sm:px-5">
                <span className="font-semibold text-foreground">{r.currency}</span>
                <span className="ml-2 text-muted">{r.name}</span>
              </td>
              <td className="px-4 py-3 text-right font-mono font-semibold text-foreground sm:px-5">
                {r.buy.toFixed(4)}
              </td>
              <td className="px-4 py-3 text-right font-mono font-semibold text-foreground sm:px-5">
                {r.sell.toFixed(4)}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
