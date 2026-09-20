import type { RateEntry } from "@/lib/bnr";
import type { RealOffice } from "@/lib/realOffices";

function formatRomanianDate(date: Date): string {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default function RealOfficeTable({
  office,
  bnrRates,
}: {
  office: RealOffice;
  bnrRates: RateEntry[];
}) {
  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="border-b border-border bg-background/60 px-4 py-3 sm:px-5">
        <p className="text-sm font-bold text-foreground">{office.name}</p>
        <p className="text-xs text-muted">
          {office.capturedLabel ? (
            <>
              {office.city}, (actualizat la data de {office.capturedLabel})
            </>
          ) : office.capturedDate ? (
            <>
              {office.city}, (actualizat la data de{" "}
              {formatRomanianDate(new Date(office.capturedDate))})
            </>
          ) : (
            <>
              {office.city} · {formatRomanianDate(new Date())}
            </>
          )}
        </p>
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
          {office.rates.map((r) => {
            const bnrEntry = bnrRates.find((b) => b.currency === r.currency);
            const bnrUnit = bnrEntry ? bnrEntry.rate / bnrEntry.multiplier : 0;
            const buy = bnrUnit * r.buyFactor;
            const sell = bnrUnit * r.sellFactor;
            return (
              <tr key={r.currency} className="border-b border-border last:border-0">
                <td className="px-4 py-3 sm:px-5">
                  <span className="font-semibold text-foreground">{r.currency}</span>
                  <span className="ml-2 text-muted">{r.name}</span>
                </td>
                <td className="px-4 py-3 text-right font-mono font-semibold text-foreground sm:px-5">
                  {buy.toFixed(4)}
                </td>
                <td className="px-4 py-3 text-right font-mono font-semibold text-foreground sm:px-5">
                  {sell.toFixed(4)}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {office.source && (
        <p className="border-t border-border px-4 py-2 text-xs text-muted sm:px-5">
          sursa: {office.source}
        </p>
      )}
    </div>
  );
}
