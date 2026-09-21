import { getHistory } from "@/lib/bnr";

function formatDelta(delta: number): string {
  const sign = delta >= 0 ? "+" : "";
  return `${sign}${delta.toFixed(4)}`;
}

interface Row {
  label: string;
  value: number;
  unit: string;
  delta: number;
  deltaUnit: string;
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
      label: "1 EURO",
      value: eurToday,
      unit: "Lei",
      delta: eurToday - eurYesterday,
      deltaUnit: "Lei",
    },
    {
      label: "1 USD",
      value: usdToday,
      unit: "Lei",
      delta: usdToday - usdYesterday,
      deltaUnit: "Lei",
    },
    {
      label: "1 GBP",
      value: gbpToday,
      unit: "Lei",
      delta: gbpToday - gbpYesterday,
      deltaUnit: "Lei",
    },
    {
      label: "1 CHF",
      value: chfToday,
      unit: "Lei",
      delta: chfToday - chfYesterday,
      deltaUnit: "Lei",
    },
  ];

  return (
    <div className="overflow-hidden rounded-xl border border-border bg-surface">
      <div className="border-b border-border bg-background/60 px-4 py-3 sm:px-5">
        <p className="text-[11px] font-extrabold tracking-wide text-brand uppercase">
          Curs oficial BNR
        </p>
        <p className="mt-0.5 text-sm text-muted">comunicat luni, 21 septembrie 2026</p>
      </div>
      {rows.map((row, i) => {
        const up = row.delta >= 0;
        return (
          <div
            key={i}
            className={`flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-4 py-3 text-sm sm:px-5 ${
              i > 0 ? "border-t border-border" : ""
            }`}
          >
            <span className="text-foreground">
              {row.label} = <span className="font-mono font-bold">{row.value.toFixed(4)}</span>{" "}
              {row.unit}
            </span>
            <span
              className={`flex items-center gap-1.5 font-bold ${
                up ? "text-positive" : "text-negative"
              }`}
            >
              {formatDelta(row.delta)} {row.deltaUnit} {up ? "↑" : "↓"}
            </span>
          </div>
        );
      })}
    </div>
  );
}
