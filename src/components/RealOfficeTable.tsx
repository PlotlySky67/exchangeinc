import type { RateEntry } from "@/lib/bnr";
import type { RealOffice } from "@/lib/realOffices";

function formatRomanianDate(date: Date): string {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

const WEEK_MS = 7 * 24 * 60 * 60 * 1000;

function isStale(capturedDate?: string): boolean {
  if (!capturedDate) return false;
  const diff = Date.now() - new Date(capturedDate).getTime();
  return diff > WEEK_MS;
}

export default function RealOfficeTable({
  office,
  bnrRates,
}: {
  office: RealOffice;
  bnrRates: RateEntry[];
}) {
  const stale = isStale(office.capturedDate);

  return (
    <div
      className={`overflow-hidden rounded-2xl border border-border bg-surface shadow-sm ${
        stale ? "grayscale" : ""
      }`}
    >
      <div className="flex items-start justify-between gap-3 border-b border-border bg-background/60 px-4 py-3 sm:px-5">
        <div>
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
        {office.capturedTime && (
          <span className="shrink-0 whitespace-nowrap text-xs font-semibold text-muted">
            ora {office.capturedTime}
          </span>
        )}
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
        <div className="flex items-center justify-between gap-3 border-t border-border px-4 py-2 sm:px-5">
          <p className="text-xs text-muted">sursa: {office.source}</p>
          <span className="flex shrink-0 items-center gap-1 text-xs font-semibold text-positive">
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3.5 w-3.5"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M16.704 5.29a1 1 0 010 1.415l-7.5 7.5a1 1 0 01-1.414 0l-3.5-3.5a1 1 0 111.414-1.414l2.793 2.793 6.793-6.793a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
            verificat manual
          </span>
        </div>
      )}
    </div>
  );
}
