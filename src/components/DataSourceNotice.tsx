export default function DataSourceNotice({
  source,
  className = "",
}: {
  source: "live" | "fallback";
  className?: string;
}) {
  if (source === "live") {
    return (
      <div
        className={`rounded-md border border-positive/40 bg-positive/10 px-3 py-2 text-xs font-medium ${className}`}
        style={{ color: "var(--positive)" }}
      >
        ✓ Flux BNR disponibil — curs live, actualizat.
      </div>
    );
  }
  return (
    <div
      className={`rounded-md border border-accent/40 bg-accent/10 px-3 py-2 text-xs font-medium text-accent-foreground ${className}`}
      style={{ color: "var(--accent)" }}
    >
      ⚠ Flux BNR indisponibil momentan — se afișează date de rezervă (cache),
      nu curs live.
    </div>
  );
}
