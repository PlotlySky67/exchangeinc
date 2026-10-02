import { getHistory } from "@/lib/bnr";

function formatRomanianDate(dateStr: string): string {
  return new Intl.DateTimeFormat("ro-RO", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

function formatDelta(delta: number): string {
  const sign = delta >= 0 ? "+" : "";
  return `${sign}${delta.toFixed(4)}`;
}

interface Row {
  code: string;
  flag: string;
  name: string;
  value: number;
  delta: number;
}

export default async function DailyRateSummary() {
  const [eurHistory, usdHistory, gbpHistory, chfHistory] = await Promise.all([
    getHistory("EUR", 2),
    getHistory("USD", 2),
    getHistory("GBP", 2),
    getHistory("CHF", 2),
  ]);

  const eurPoints = eurHistory.points;
  const usdPoints = usdHistory.points;
  const gbpPoints = gbpHistory.points;
  const chfPoints = chfHistory.points;
  const eurToday = eurPoints[eurPoints.length - 1]?.rate ?? 0;
  const eurYesterday = eurPoints[eurPoints.length - 2]?.rate ?? eurToday;
  const usdToday = usdPoints[usdPoints.length - 1]?.rate ?? 0;
  const usdYesterday = usdPoints[usdPoints.length - 2]?.rate ?? usdToday;
  const gbpToday = gbpPoints[gbpPoints.length - 1]?.rate ?? 0;
  const gbpYesterday = gbpPoints[gbpPoints.length - 2]?.rate ?? gbpToday;
  const chfToday = chfPoints[chfPoints.length - 1]?.rate ?? 0;
  const chfYesterday = chfPoints[chfPoints.length - 2]?.rate ?? chfToday;

  const rows: Row[] = [
    { code: "EUR", flag: "🇪🇺", name: "Euro", value: eurToday, delta: eurToday - eurYesterday },
    {
      code: "USD",
      flag: "🇺🇸",
      name: "Dolar american",
      value: usdToday,
      delta: usdToday - usdYesterday,
    },
    {
      code: "GBP",
      flag: "🇬🇧",
      name: "Liră sterlină",
      value: gbpToday,
      delta: gbpToday - gbpYesterday,
    },
    {
      code: "CHF",
      flag: "🇨🇭",
      name: "Franc elvețian",
      value: chfToday,
      delta: chfToday - chfYesterday,
    },
  ];

  const latestDate = eurPoints[eurPoints.length - 1]?.date;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="px-5 py-4 sm:px-6">
        <p className="text-xs font-extrabold tracking-wide text-brand uppercase">
          Curs oficial BNR
        </p>
        <p className="mt-0.5 text-sm text-muted">
          {latestDate ? `comunicat ${formatRomanianDate(latestDate)}` : ""}
        </p>
      </div>
      {rows.map((row, i) => {
        const up = row.delta >= 0;
        return (
          <div
            key={row.code}
            className={`flex items-center justify-between gap-3 px-5 py-4 sm:px-6 ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-lg">
                {row.flag}
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{row.name}</p>
                <p className="text-xs text-muted">{row.code}/RON</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg font-extrabold text-foreground">
                {row.value.toFixed(4)}
              </p>
              <p className={`text-xs font-bold ${up ? "text-positive" : "text-negative"}`}>
                {formatDelta(row.delta)} {up ? "↑" : "↓"}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
