import { getHistory } from "@/lib/bnr";

function formatRomanianDate(dateStr: string): string {
  return new Intl.DateTimeFormat("ro-RO", {
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
  label: string;
  value: number;
  unit: string;
  delta: number;
  deltaUnit: string;
}

export default async function DailyRateSummary() {
  const [eurHistory, usdHistory] = await Promise.all([
    getHistory("EUR", 2),
    getHistory("USD", 2),
  ]);

  const eurPoints = eurHistory.points;
  const usdPoints = usdHistory.points;
  const eurToday = eurPoints[eurPoints.length - 1]?.rate ?? 0;
  const eurYesterday = eurPoints[eurPoints.length - 2]?.rate ?? eurToday;
  const usdToday = usdPoints[usdPoints.length - 1]?.rate ?? 0;
  const usdYesterday = usdPoints[usdPoints.length - 2]?.rate ?? usdToday;

  const crossToday = usdToday !== 0 ? eurToday / usdToday : 0;
  const crossYesterday = usdYesterday !== 0 ? eurYesterday / usdYesterday : crossToday;

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
      label: "1 EURO",
      value: crossToday,
      unit: "USD",
      delta: crossToday - crossYesterday,
      deltaUnit: "USD",
    },
  ];

  const latestDate = eurPoints[eurPoints.length - 1]?.date;

  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-sm text-foreground">
        <span className="font-bold">Cursul valutar BNR</span> comunicat în{" "}
        {latestDate ? formatRomanianDate(latestDate) : ""}
      </p>
      <div className="mt-3 space-y-2">
        {rows.map((row, i) => {
          const up = row.delta >= 0;
          return (
            <div
              key={i}
              className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 text-sm"
            >
              <span className="font-semibold text-foreground">
                {row.label} = {row.value.toFixed(4)} {row.unit}
              </span>
              <span
                className={`flex items-center gap-1 font-medium ${
                  up ? "text-positive" : "text-negative"
                }`}
              >
                {formatDelta(row.delta)} {row.deltaUnit} {up ? "↑" : "↓"}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
