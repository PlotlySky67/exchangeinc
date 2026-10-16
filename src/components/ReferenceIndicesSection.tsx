interface RoborRow {
  label: string;
  value: number;
  // Change vs. the previous reading. Omitted when no prior real reading
  // exists to compare against (never fabricated).
  delta?: number;
}

// Real published reference indices, sourced by the site owner.
const IRCC_QUARTER = "2026T2";
const IRCC_VALUE = 5.57;

const ROBOR_DATE = "16 octombrie 2026";
const ROBOR_ROWS: RoborRow[] = [
  { label: "3M (3 luni)", value: 6.08, delta: 0 },
  { label: "6M (6 luni)", value: 6.13, delta: -0.01 },
  { label: "12M (12 luni)", value: 6.19, delta: 0 },
];

function formatDelta(delta: number): string {
  const sign = delta >= 0 ? "+" : "";
  return `${sign}${delta.toFixed(2)}`;
}

export default function ReferenceIndicesSection() {
  return (
    <section className="mt-12 border-t border-border pt-10">
      <h2 className="text-2xl font-bold tracking-tight text-foreground">
        Indici de referință
      </h2>
      <p className="mt-1 text-sm font-semibold uppercase tracking-wide text-brand">
        IRCC și ROBOR
      </p>
      <p className="mt-4 text-sm leading-relaxed text-muted">
        Indicii oficiali folosiți la calculul dobânzilor variabile pentru
        creditele în lei.
      </p>

      <div className="mt-6 overflow-hidden rounded-2xl border border-border bg-surface shadow-sm">
        <div className="flex items-center justify-between px-4 py-4 sm:px-5">
          <div>
            <p className="text-sm font-bold text-foreground">
              Indicele IRCC trimestrial
            </p>
            <p className="text-xs text-muted">{IRCC_QUARTER}</p>
          </div>
          <p className="font-mono text-xl font-extrabold text-foreground">
            {IRCC_VALUE.toFixed(2)}%
          </p>
        </div>
        <div className="border-t border-border px-4 py-3 sm:px-5">
          <p className="text-sm font-bold text-foreground">Indicele ROBOR</p>
          <p className="text-xs text-muted">stabilit în {ROBOR_DATE}</p>
        </div>
        {ROBOR_ROWS.map((row, i) => {
          const hasDelta = row.delta !== undefined;
          const up = hasDelta && row.delta! > 0;
          const down = hasDelta && row.delta! < 0;
          return (
            <div
              key={row.label}
              className={`flex items-center justify-between px-4 py-3 sm:px-5 ${
                i > 0 ? "border-t border-border" : ""
              }`}
            >
              <span className="text-sm text-foreground">{row.label}</span>
              <div className="flex items-center gap-2">
                <span className="font-mono text-sm font-bold text-foreground">
                  {row.value.toFixed(2)}%
                </span>
                {hasDelta && (
                  <span
                    className={`text-xs font-bold ${
                      up ? "text-positive" : down ? "text-negative" : "text-muted"
                    }`}
                  >
                    {formatDelta(row.delta!)} {up ? "↑" : down ? "↓" : "="}
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
