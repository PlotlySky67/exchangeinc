import Link from "next/link";
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
  symbol: string;
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
    {
      code: "EUR",
      symbol: "€",
      name: "Euro",
      value: eurToday,
      delta: eurToday - eurYesterday,
    },
    {
      code: "USD",
      symbol: "$",
      name: "Dolar american",
      value: usdToday,
      delta: usdToday - usdYesterday,
    },
    {
      code: "GBP",
      symbol: "£",
      name: "Liră sterlină",
      value: gbpToday,
      delta: gbpToday - gbpYesterday,
    },
    {
      code: "CHF",
      symbol: "CHF",
      name: "Franc elvețian",
      value: chfToday,
      delta: chfToday - chfYesterday,
    },
  ];

  const latestDate = eurPoints[eurPoints.length - 1]?.date;

  return (
    <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
      <div className="px-5 py-4 sm:px-6">
        <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
          <p className="text-xs font-extrabold tracking-wide text-brand uppercase">
            Curs oficial BNR
          </p>
          <Link
            href="https://www.bnr.ro/Cursul-de-schimb-3544.aspx"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 rounded-full border border-border bg-background px-2.5 py-1 text-[11px] font-semibold text-muted transition-colors hover:text-brand"
          >
            <svg
              viewBox="0 0 20 20"
              fill="currentColor"
              className="h-3 w-3"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z"
                clipRule="evenodd"
              />
            </svg>
            sursă oficială bnr.ro
          </Link>
        </div>
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
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand/10 text-base font-extrabold text-brand">
                {row.symbol}
              </span>
              <div>
                <p className="text-sm font-bold text-foreground">{row.name}</p>
                <p className="text-xs text-muted">{row.code}/RON</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-mono text-lg font-extrabold text-foreground">
                <span className="mr-1 text-sm font-semibold text-muted">{row.symbol}</span>
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
